import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
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
  @ApiOperation({ summary: 'Create a reader' })
  @ApiCreatedResponse({ type: Reader })
  create(@Body() createReaderDto: CreateReaderDto): Promise<Reader> {
    return this.readerService.create(createReaderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all readers' })
  @ApiOkResponse({ type: [Reader] })
  findAll(): Promise<Reader[]> {
    return this.readerService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a reader by id' })
  @ApiOkResponse({ type: Reader })
  findOne(@Param('id') id: string): Promise<Reader> {
    return this.readerService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a reader' })
  @ApiOkResponse({ type: Reader })
  update(
    @Param('id') id: string,
    @Body() updateReaderDto: UpdateReaderDto,
  ): Promise<Reader> {
    return this.readerService.update(id, updateReaderDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a reader' })
  @ApiOkResponse({ description: 'Removes the specified reader.' })
  remove(@Param('id') id: string): Promise<void> {
    return this.readerService.remove(id);
  }

  @Get(':id/rented-books')
  @ApiOperation({ summary: 'Get books rented by a reader' })
  @ApiOkResponse({ type: [Book] })
  getRentedBooks(@Param('id') id: string): Promise<Book[]> {
    return this.readerService.getRentedBooks(id);
  }
}
