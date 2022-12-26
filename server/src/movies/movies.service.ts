import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { lastValueFrom } from 'rxjs';
import { Repository } from 'typeorm';
import movieDbClient, {
  MOVIEDB_API_KEY,
  MOVIEDB_BASE_PATH,
} from '../client/moviedb.client';
import { CreateMovieDto } from './dto/create-movie.dto';
import { PageMetaDto } from './dto/page-meta.dto';
import { PageOptionsDto } from './dto/page-options.dto';
import { PageDto } from './dto/page.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

// axios bug ref: https://stackoverflow.com/questions/74713476/getting-unexpected-end-of-file-axios-error-while-making-a-get-request-in-this
const DEFAULT_HEADERS = { 'Accept-Encoding': 'gzip,deflate,compress' };

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly _movieRepository: Repository<Movie>,
    private readonly httpService: HttpService,
  ) {}

  getMovie = async (
    page: number,
  ): Promise<{ movies: MovieDbMoviesResult[]; totalPages: number }> => {
    try {
      const res = await lastValueFrom(
        this.httpService.get<MovieDbMoviesResponse>(
          `${MOVIEDB_BASE_PATH}list/1?page=${page}&api_key=${MOVIEDB_API_KEY}`,
          { headers: DEFAULT_HEADERS },
        ),
      );

      const movies = res.data.results;
      const totalPages = res.data.total_pages;
      return { movies, totalPages };
    } catch (error) {
      console.log('hata', error.message);

      return error.message;
    }
  };

  async getMovies() {
    let allMovies: MovieDbMoviesResult[] = [];
    let page = 1;
    let allPages = 0;
    const { movies, totalPages } = await this.getMovie(page);

    allPages = totalPages;

    if (movies.length) {
      allMovies = allMovies.concat(movies);
    }

    if (page >= totalPages) {
      return allMovies;
    }

    while (true) {
      const { movies } = await this.getMovie(page);
      if (movies.length) {
        allMovies = allMovies.concat(movies);
      }

      if (page >= allPages) {
        break;
      }
      page++;
    }

    return allMovies;
  }

  async insertMoviesFromApi(pageOptionsDto: PageOptionsDto) {
    const movies = await this.getMovies();

    const pageMetaDto = new PageMetaDto({
      itemCount: movies.length,
      pageOptionsDto,
    });

    return new PageDto(movies, pageMetaDto);

    // const moviesToInsert: Partial<Movie>[] = movies.map(
    //   ({ original_title }) => {
    //     return {
    //       title: original_title,
    //     };
    //   },
    // );

    // const insertedMovies = await this._movieRepository.insert(moviesToInsert);

    // ref: https://github.com/axios/axios/issues/5346
    // try {
    //   const res = await movieDbClient.get('list/1?page=1');
    //   console.log('res', res);
    //   return res.data;
    // } catch (error) {
    //   console.log('errpr', error.message);
    //   return error;
    // }
  }

  async findAllPaginate(pageOptionsDto: PageOptionsDto) {
    const queryBuilder = this._movieRepository.createQueryBuilder('movie');

    console.log('pageOptionsDto', pageOptionsDto);

    queryBuilder
      .orderBy('movie.createdAt', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();

    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  create(createMovieDto: CreateMovieDto) {
    const movie = this._movieRepository.create(createMovieDto);
    return this._movieRepository.save(movie);
  }

  findAll() {
    return this._movieRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} movie`;
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${id} movie`;
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }
}
