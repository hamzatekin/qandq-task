import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMovieDto {
  @ApiProperty({ example: 'Title', description: 'Movie title' })
  @IsString({ message: 'Must be a string' })
  @IsNotEmpty({ message: 'Must not be empty' })
  title: string;

  @ApiProperty({ example: 'Description', description: 'Movie description' })
  @IsString({ message: 'Must be a string' })
  description?: string;

  @IsString({ message: 'Must be a string' })
  @ApiProperty({ example: 2020, description: 'Movie year' })
  year?: number;

  @IsString({ message: 'Must be a string' })
  @ApiProperty({ example: 8.5, description: 'Movie rating' })
  rating?: number;
}
