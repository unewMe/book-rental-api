import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Author } from '../../author/entities/author.entity';
import { Rental } from '../../rental/entities/rental.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ unique: true })
  isbn: string;

  @Column({ type: 'int', nullable: true })
  publicationYear?: number;

  @Column({ type: 'int', default: 1 })
  copiesAvailable: number;

  @OneToMany(() => Rental, rental => rental.book)
  rentals: Rental[];

  @ManyToMany(() => Author, author => author.books)
  @JoinTable()
  authors: Author[];
}
