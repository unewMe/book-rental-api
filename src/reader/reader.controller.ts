import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReaderService } from './reader.service';
import { CreateReaderDto } from './dto/create-reader.dto';
import { UpdateReaderDto } from './dto/update-reader.dto';

@Controller('reader')
export class ReaderController {
  constructor(private readonly readerService: ReaderService) {}

  @Post()
  create(@Body() createReaderDto: CreateReaderDto) {
    return this.readerService.create(createReaderDto);
  }

  @Get()
  findAll() {
    return this.readerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.readerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReaderDto: UpdateReaderDto) {
    return this.readerService.update(+id, updateReaderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.readerService.remove(+id);
  }
}
