import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateRentalDto {
  @ApiProperty({ description: 'ID of the book to be rented' })
  @IsString()
  @IsNotEmpty()
  bookId: string;

  @ApiProperty({ description: 'ID of the reader who rents the book' })
  @IsString()
  @IsNotEmpty()
  readerId: string;

  @ApiProperty({
    description: 'Rental start date in ISO format',
    example: '2023-04-01T10:00:00Z',
  })
  @IsDateString()
  rentalDate: Date;

  @ApiProperty({
    description: 'Due date in ISO format',
    example: '2023-04-15T10:00:00Z',
  })
  @IsDateString()
  dueDate: Date;
}
