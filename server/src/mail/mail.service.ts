import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { MoviesService } from '../movies/movies.service';
import { UsersService } from '../users/users.service';
import { SendMailDto } from './dto/send-mail.dto';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly usersService: UsersService,
    private readonly moviesService: MoviesService,
  ) {}

  async recommendMovie(
    { imdbId, to }: SendMailDto,
    userPayload: { email: string; sub: string; iat: number; exp: number },
  ) {
    const user = await this.usersService.findByEmail(userPayload.email);
    if (!user) {
      return 'User not found';
    }

    const movie = await this.moviesService.findOne(imdbId);
    if (!movie) {
      return 'Movie not found';
    }

    // dont await it. just send it
    // instead add not recived e mail button
    this.mailerService.sendMail({
      to, // list of receivers
      from: 'noreply@nestjs.com', // sender address
      subject: 'Movie Recommendations', // Subject line
      html: `<p>Hello. ${user.name} reccomends ${movie.title} movie to You. go to link <a href="http://localhost:3000/movies/${imdbId}" />   </p>`, // HTML body content
    });
  }
}
