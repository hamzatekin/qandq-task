import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ApiTags } from '@nestjs/swagger';
import { PageOptionsDto } from './dto/page-options.dto';

// can be set from .env file
export const MOVIE_LIMIT = 100;

@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('insertMoviesFromApi')
  insertMoviesFromApi(@Query() pageOptionsDto: PageOptionsDto) {
    return this.moviesService.insertMoviesFromApi(pageOptionsDto);
  }

  @Get('paginate')
  paginate(@Query() pageOptionsDto: PageOptionsDto) {
    return this.moviesService.findAllPaginate(pageOptionsDto);
  }

  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @Get()
  findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return this.moviesService.findAllPaginate(pageOptionsDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.update(+id, updateMovieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moviesService.remove(+id);
  }
}
