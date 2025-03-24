import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsInt, Min } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({ description: 'Book title' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Book description' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'ISBN number' })
  @IsString()
  @IsNotEmpty()
  isbn: string;

  @ApiProperty({ description: 'Publication year', required: false })
  @IsOptional()
  @IsInt()
  publicationYear?: number;
}
