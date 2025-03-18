import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entities/author.entity';

@ApiTags('author') // Optional, adds a tag in Swagger UI
@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  @ApiOkResponse({ type: Author })
  create(@Body() createAuthorDto: CreateAuthorDto): Promise<Author> {
    return this.authorService.create(createAuthorDto);
  }

  @Get()
  @ApiOkResponse({ type: [Author] }) // Tells Swagger this returns an array of Author
  findAll(): Promise<Author[]> {
    return this.authorService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: Author })
  findOne(@Param('id') id: string): Promise<Author> {
    return this.authorService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: Author })
  update(
    @Param('id') id: string,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ): Promise<Author> {
    return this.authorService.update(id, updateAuthorDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Deletes the author. No content returned.' })
  remove(@Param('id') id: string): Promise<void> {
    return this.authorService.remove(id);
  }
}
