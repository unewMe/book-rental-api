import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Rental } from '../../rental/entities/rental.entity';

@Entity()
export class Reader {
  @ApiProperty({ description: 'Unique identifier for the reader' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: "Reader's first name" })
  @Column()
  firstName: string;

  @ApiProperty({ description: "Reader's last name" })
  @Column()
  lastName: string;

  @ApiProperty({ description: 'Unique email address of the reader' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    description: 'List of rentals associated with this reader',
    type: () => [Rental],
  })
  @OneToMany(() => Rental, (rental) => rental.reader)
  rentals: Rental[];
}
