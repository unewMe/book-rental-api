import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsInt, Min } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({ description: 'Book title', example: 'The Great Gatsby' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Book description',
    example: 'A novel by F. Scott Fitzgerald',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'ISBN number', example: '978-3-16-148410-0' })
  @IsString()
  @IsNotEmpty()
  isbn: string;

  @ApiProperty({
    description: 'Publication year',
    example: '2018',
    required: false,
  })
  @IsOptional()
  @IsInt()
  publicationYear?: number;
}
