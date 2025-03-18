import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './entities/author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const author = this.authorRepository.create(createAuthorDto);
    return await this.authorRepository.save(author);
  }

  async findAll(): Promise<Author[]> {
    return await this.authorRepository.find({ relations: ['books'] });
  }

  async findOne(id: string): Promise<Author> {
    const author = await this.authorRepository.findOne({
      where: { id },
      relations: ['books'],
    });
    if (!author) {
      throw new NotFoundException(`Author with id ${id} not found`);
    }
    return author;
  }

  async update(id: string, updateAuthorDto: UpdateAuthorDto): Promise<Author> {
    const author = await this.findOne(id);
    Object.assign(author, updateAuthorDto);
    return await this.authorRepository.save(author);
  }

  async remove(id: string): Promise<void> {
    const author = await this.findOne(id);
    await this.authorRepository.remove(author);
  }
}
