import { Controller, Post, Put, Get, Param, Body } from '@nestjs/common';
import { RentalService } from './rental.service';

@Controller('rentals')
export class RentalController {
  constructor(private readonly rentalService: RentalService) {}

  @Post('rent')
  rentBook(
    @Body('bookId') bookId: string,
    @Body('readerId') readerId: string,
    @Body('rentalDate') rentalDate: Date,
    @Body('dueDate') dueDate: Date,
  ) {
    return this.rentalService.rentBook(bookId, readerId, rentalDate, dueDate);
  }

  @Put('return/:rentalId')
  returnBook(@Param('rentalId') rentalId: string) {
    return this.rentalService.returnBook(rentalId);
  }

  @Get('reader/:readerId')
  getRentalsByReader(@Param('readerId') readerId: string) {
    return this.rentalService.getRentalsByReader(readerId);
  }

  @Get()
  getAllRentals() {
    return this.rentalService.getAllRentals();
  }
}
