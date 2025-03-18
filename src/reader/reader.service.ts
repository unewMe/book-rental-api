import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReaderDto } from './dto/create-reader.dto';
import { UpdateReaderDto } from './dto/update-reader.dto';
import { Reader } from './entities/reader.entity';
import { Rental } from '../rental/entities/rental.entity';
import { Book } from '../book/entities/book.entity';


@Injectable()
export class ReaderService {
  constructor(
    @InjectRepository(Reader)
    private readonly readerRepository: Repository<Reader>,
    @InjectRepository(Rental)
    private readonly rentalRepository: Repository<Rental>,
  ) {}

  async create(createReaderDto: CreateReaderDto): Promise<Reader> {
    const reader = this.readerRepository.create(createReaderDto);
    return await this.readerRepository.save(reader);
  }

  async findAll(): Promise<Reader[]> {
    return await this.readerRepository.find();
  }

  async findOne(id: string): Promise<Reader> {
    const reader = await this.readerRepository.findOne({ where: { id } });
    if (!reader) {
      throw new NotFoundException(`Reader with id ${id} not found`);
    }
    return reader;
  }

  async update(id: string, updateReaderDto: UpdateReaderDto): Promise<Reader> {
    const reader = await this.findOne(id);
    Object.assign(reader, updateReaderDto);
    return await this.readerRepository.save(reader);
  }

  async remove(id: string): Promise<void> {
    const reader = await this.findOne(id);
    await this.readerRepository.remove(reader);
  }

  async getRentedBooks(readerId: string): Promise<Book[]> {
    const reader = await this.readerRepository.findOne({
      where: { id: readerId },
      relations: ['rentals', 'rentals.book'],
    });
    if (!reader) {
      throw new NotFoundException(`Reader with id ${readerId} not found`);
    }
    return reader.rentals
      .filter((rental) => rental.status === 'wypożyczona')
      .map((rental) => rental.book);
  }
}
