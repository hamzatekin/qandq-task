import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SendMailDto {
  @ApiProperty()
  @IsNotEmpty()
  imdbId: string;

  @ApiProperty()
  @IsNotEmpty()
  to: string;
}
