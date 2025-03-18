import { Module } from '@nestjs/common';
import { ReaderService } from './reader.service';
import { ReaderController } from './reader.controller';
import { Type } from 'class-transformer';
import { Reader } from './entities/reader.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rental } from 'src/rental/entities/rental.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reader, Rental])],
  controllers: [ReaderController],
  providers: [ReaderService],
})
export class ReaderModule {}
