import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Header,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entities/author.entity';
import { Book } from 'src/book/entities/book.entity';

@ApiTags('author')
@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  @ApiOperation({ summary: 'Create an author' })
  @ApiCreatedResponse({ type: Author })
  create(@Body() createAuthorDto: CreateAuthorDto): Promise<Author> {
    return this.authorService.create(createAuthorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all authors' })
  @ApiOkResponse({ type: [Author] })
  @Header('Cache-Control', 'public, max-age=600')
  findAll(): Promise<Author[]> {
    return this.authorService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an author by id' })
  @ApiOkResponse({ type: Author })
  findOne(@Param('id') id: string): Promise<Author> {
    return this.authorService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an author' })
  @ApiOkResponse({ type: Author })
  update(
    @Param('id') id: string,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ): Promise<Author> {
    return this.authorService.update(id, updateAuthorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an author' })
  @ApiOkResponse({ description: 'Deletes the author. No content returned.' })
  remove(@Param('id') id: string): Promise<void> {
    return this.authorService.remove(id);
  }

  @Get(':id/books')
  @ApiOperation({ summary: 'Get all books by author' })
  @ApiOkResponse({ type: [Book] })
  getBooks(@Param('id') id: string): Promise<Book[]> {
    return this.authorService.getBooks(id);
  }
}
