import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Book } from '../../book/entities/book.entity';

@Entity()
export class Author {
  @ApiProperty({ description: "Author's unique identifier" })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: "Author's first name" })
  @Column()
  firstName: string;

  @ApiProperty({ description: "Author's last name" })
  @Column()
  lastName: string;

  @ApiProperty({
    description: "Author's short biography",
    required: false,
  })
  @Column({ nullable: true, type: 'text' })
  bio?: string;

  @ApiProperty({
    description: 'List of books written',
    type: () => [Book],
  })
  @ManyToMany(() => Book, (book) => book.authors)
  books: Book[];
}
