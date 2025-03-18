import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Author } from '../../author/entities/author.entity';
import { Rental } from '../../rental/entities/rental.entity';

@Entity()
export class Book {
  @ApiProperty({ description: 'Unique identifier for the book' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Title of the book' })
  @Column()
  title: string;

  @ApiProperty({ description: 'Detailed description of the book' })
  @Column({ type: 'text' })
  description: string;

  @ApiProperty({ description: 'ISBN of the book' })
  @Column({ unique: true })
  isbn: string;

  @ApiProperty({
    description: 'Year the book was published',
    required: false,
    type: Number,
  })
  @Column({ type: 'int', nullable: true })
  publicationYear?: number;

  @ApiProperty({
    description: 'Number of available copies',
    default: 1,
  })
  @Column({ type: 'int', default: 1 })
  copiesAvailable: number;

  @ApiProperty({
    description: 'List of rental records for this book',
    type: () => [Rental],
  })
  @OneToMany(() => Rental, (rental) => rental.book)
  rentals: Rental[];

  @ApiProperty({
    description: 'List of authors for this book',
    type: () => [Author],
  })
  @ManyToMany(() => Author, (author) => author.books)
  @JoinTable()
  authors: Author[];
}
