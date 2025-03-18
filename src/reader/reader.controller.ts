import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { ReaderService } from './reader.service';
import { CreateReaderDto } from './dto/create-reader.dto';
import { UpdateReaderDto } from './dto/update-reader.dto';
import { Reader } from './entities/reader.entity';
import { Book } from '../book/entities/book.entity';

@ApiTags('readers')
@Controller('readers')
export class ReaderController {
  constructor(private readonly readerService: ReaderService) {}

  @Post()
  @ApiCreatedResponse({ type: Reader })
  create(@Body() createReaderDto: CreateReaderDto): Promise<Reader> {
    return this.readerService.create(createReaderDto);
  }

  @Get()
  @ApiOkResponse({ type: [Reader] })
  findAll(): Promise<Reader[]> {
    return this.readerService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: Reader })
  findOne(@Param('id') id: string): Promise<Reader> {
    return this.readerService.findOne(id);
  }

  @Put(':id')
  @ApiOkResponse({ type: Reader })
  update(
    @Param('id') id: string,
    @Body() updateReaderDto: UpdateReaderDto,
  ): Promise<Reader> {
    return this.readerService.update(id, updateReaderDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Removes the specified reader.' })
  remove(@Param('id') id: string): Promise<void> {
    return this.readerService.remove(id);
  }

  @Get(':id/rented-books')
  @ApiOkResponse({ type: [Book] })
  getRentedBooks(@Param('id') id: string): Promise<Book[]> {
    return this.readerService.getRentedBooks(id);
  }
}
