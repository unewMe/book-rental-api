import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Book } from '../../book/entities/book.entity';
import { Reader } from '../../reader/entities/reader.entity';

@Entity()
export class Rental {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Reader, (reader) => reader.rentals, { eager: true })
  reader: Reader;

  @ManyToOne(() => Book, (book) => book.rentals, { eager: true })
  book: Book;

  @Column({ type: 'timestamp' })
  rentalDate: Date;

  @Column({ type: 'timestamp' })
  dueDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  returnDate?: Date;

  @Column({ default: 'wypożyczona' })
  status: string;
}
