import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Rental } from '../../rental/entities/rental.entity';

@Entity()
export class Reader {
  @ApiProperty({ description: "Reader's unique identifier" })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: "Reader's first name" })
  @Column()
  firstName: string;

  @ApiProperty({ description: "Reader's last name" })
  @Column()
  lastName: string;

  @ApiProperty({ description: "Reader's email address" })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    description: 'List of rentals',
    type: () => [Rental],
  })
  @OneToMany(() => Rental, (rental) => rental.reader)
  rentals: Rental[];
}
