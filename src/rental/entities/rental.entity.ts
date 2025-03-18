import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Book } from '../../book/entities/book.entity';
import { Reader } from '../../reader/entities/reader.entity';

@Entity()
export class Rental {
  @ApiProperty({ description: 'Unique identifier for the rental' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'The reader who rented the book',
    type: () => Reader,
  })
  @ManyToOne(() => Reader, (reader) => reader.rentals, { eager: true })
  reader: Reader;

  @ApiProperty({
    description: 'The rented book',
    type: () => Book,
  })
  @ManyToOne(() => Book, (book) => book.rentals, { eager: true })
  book: Book;

  @ApiProperty({
    description: 'Date and time the rental started (ISO format)',
    example: '2025-03-18T10:00:00Z',
  })
  @Column({ type: 'timestamp' })
  rentalDate: Date;

  @ApiProperty({
    description: 'Date and time the rental is due (ISO format)',
    example: '2025-03-25T10:00:00Z',
  })
  @Column({ type: 'timestamp' })
  dueDate: Date;

  @ApiProperty({
    description: 'Date and time the book was returned (ISO format)',
    example: '2025-03-22T14:30:00Z',
    required: false,
  })
  @Column({ type: 'timestamp', nullable: true })
  returnDate?: Date;

  @ApiProperty({
    description: 'Status of the rental (e.g. "wypożyczona", "zwrócona")',
    default: 'wypożyczona',
  })
  @Column({ default: 'wypożyczona' })
  status: string;
}
