import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Header,
} from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@ApiTags('books')
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @ApiOperation({ summary: 'Create a book' })
  @ApiCreatedResponse({ type: Book })
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all books' })
  @ApiOkResponse({ type: [Book] })
  @Header('Cache-Control', 'public, max-age=600')
  findAll() {
    return this.bookService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a book by id' })
  @ApiOkResponse({ type: Book })
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a book' })
  @ApiOkResponse({ type: Book })
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(id, updateBookDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a book' })
  @ApiOkResponse({ description: 'Book removed successfully' })
  remove(@Param('id') id: string) {
    return this.bookService.remove(id);
  }

  @Post(':id/author/:authorId')
  @ApiOperation({ summary: 'Assign an author to a book' })
  @ApiOkResponse({ type: Book })
  assignAuthor(
    @Param('id') bookId: string,
    @Param('authorId') authorId: string,
  ) {
    return this.bookService.assignAuthor(bookId, authorId);
  }

  @Delete(':id/author/:authorId')
  @ApiOperation({ summary: 'Remove an author from a book' })
  @ApiOkResponse({ type: Book })
  removeAuthor(
    @Param('id') bookId: string,
    @Param('authorId') authorId: string,
  ) {
    return this.bookService.removeAuthor(bookId, authorId);
  }
}
