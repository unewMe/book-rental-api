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
  @ApiProperty({ description: 'Book unique identifier' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Book title' })
  @Column()
  title: string;

  @ApiProperty({ description: 'Book description' })
  @Column({ type: 'text' })
  description: string;

  @ApiProperty({ description: 'Book ISBN number' })
  @Column({ unique: true })
  isbn: string;

  @ApiProperty({
    description: 'Book publication year',
    required: false,
    type: Number,
  })
  @Column({ type: 'int', nullable: true })
  publicationYear?: number;

  @ApiProperty({
    description: 'Indicates if is currently rented',
    default: false,
  })
  @Column({ default: false })
  isRented: boolean;

  @ApiProperty({
    description: 'List of rentals',
    type: () => [Rental],
  })
  @OneToMany(() => Rental, (rental) => rental.book, {cascade: true})
  rentals: Rental[];

  @ApiProperty({
    description: 'List of authors',
    type: () => [Author],
  })
  @ManyToMany(() => Author, (author) => author.books, {cascade: true})
  @JoinTable()
  authors: Author[];
}
