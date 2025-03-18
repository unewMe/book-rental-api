import { Module } from '@nestjs/common';
import { RentalService } from './rental.service';
import { RentalController } from './rental.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rental } from './entities/rental.entity';
import { Book } from 'src/book/entities/book.entity';
import { Reader } from 'src/reader/entities/reader.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rental, Book, Reader])],
  controllers: [RentalController],
  providers: [RentalService],
  exports: [RentalService],
})
export class RentalModule {}
