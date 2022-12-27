import { Controller, Get, Request } from '@nestjs/common';
import { Body, Param, Post, Query, UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SendMailDto } from './dto/send-mail.dto';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @UseGuards(JwtAuthGuard)
  @Post('recommend-movie')
  async recommendMovie(@Request() req, @Body() sendMailDto: SendMailDto) {
    return this.mailService.recommendMovie(sendMailDto, req.user);
  }
}
