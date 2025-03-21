import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rental } from './entities/rental.entity';
import { Book } from '../book/entities/book.entity';
import { Reader } from '../reader/entities/reader.entity';


@Injectable()
export class RentalService {
  constructor(
    @InjectRepository(Rental)
    private readonly rentalRepository: Repository<Rental>,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(Reader)
    private readonly readerRepository: Repository<Reader>,
  ) {}

  async rentBook(
    bookId: string,
    readerId: string,
    rentalDate: Date,
    dueDate: Date,
  ): Promise<Rental> {
    const book = await this.bookRepository.findOne({
      where: { id: bookId },
      relations: ['rentals'],
    });
    if (!book) {
      throw new NotFoundException(`Book with id ${bookId} not found`);
    }
    const reader = await this.readerRepository.findOne({
      where: { id: readerId },
    });
    if (!reader) {
      throw new NotFoundException(`Reader with id ${readerId} not found`);
    }
    const activeRentalsCount = await this.rentalRepository.count({
      where: {
        book: { id: bookId },
        status: 'wypożyczona',
      },
    });
    if (activeRentalsCount >= book.copiesAvailable) {
      throw new BadRequestException(
        `No available copies for book id ${bookId}`,
      );
    }
    const rental = this.rentalRepository.create({
      book,
      reader,
      rentalDate,
      dueDate,
      status: 'wypożyczona',
    });
    return await this.rentalRepository.save(rental);
  }

  async returnBook(rentalId: string): Promise<Rental> {
    const rental = await this.rentalRepository.findOne({
      where: { id: rentalId },
    });
    if (!rental) {
      throw new NotFoundException(`Rental with id ${rentalId} not found`);
    }
    if (rental.status !== 'wypożyczona') {
      throw new BadRequestException(
        `Rental with id ${rentalId} is not currently rented`,
      );
    }
    rental.returnDate = new Date();
    rental.status = 'zwrócona';
    return await this.rentalRepository.save(rental);
  }

  async getRentalsByReader(readerId: string): Promise<Rental[]> {
    const reader = await this.readerRepository.findOne({
      where: { id: readerId },
    });
    if (!reader) {
      throw new NotFoundException(`Reader with id ${readerId} not found`);
    }
    return await this.rentalRepository.find({
      where: { reader: { id: readerId } },
      relations: ['book'],
    });
  }

  async getAllRentals(): Promise<Rental[]> {
    return await this.rentalRepository.find({ relations: ['book', 'reader'] });
  }
}
