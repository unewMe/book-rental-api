import { Controller, Post, Put, Get, Param, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { RentalService } from './rental.service';
import { CreateRentalDto } from './dto/create-rental.dto';
import { Rental } from './entities/rental.entity';

@ApiTags('rentals')
@Controller('rentals')
export class RentalController {
  constructor(private readonly rentalService: RentalService) {}

  @Post('rent')
  @ApiCreatedResponse({ type: Rental })
  rentBook(@Body() createRentalDto: CreateRentalDto): Promise<Rental> {
    return this.rentalService.rentBook(
      createRentalDto.bookId,
      createRentalDto.readerId,
      createRentalDto.rentalDate,
      createRentalDto.dueDate,
    );
  }

  @Put('return/:rentalId')
  @ApiOkResponse({ type: Rental })
  returnBook(@Param('rentalId') rentalId: string): Promise<Rental> {
    return this.rentalService.returnBook(rentalId);
  }

  @Get('reader/:readerId')
  @ApiOkResponse({ type: [Rental] })
  getRentalsByReader(@Param('readerId') readerId: string): Promise<Rental[]> {
    return this.rentalService.getRentalsByReader(readerId);
  }

  @Get()
  @ApiOkResponse({ type: [Rental] })
  getAllRentals(): Promise<Rental[]> {
    return this.rentalService.getAllRentals();
  }
}
