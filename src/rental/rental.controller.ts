import { Controller, Post, Put, Get, Param, Body } from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { RentalService } from './rental.service';
import { CreateRentalDto } from './dto/create-rental.dto';
import { Rental } from './entities/rental.entity';
import { UpdateRentalDto } from './dto/update-rental.dto';

@ApiTags('rentals')
@Controller('rentals')
export class RentalController {
  constructor(private readonly rentalService: RentalService) {}

  @Post('rent')
  @ApiOperation({ summary: 'Rent a book' })
  @ApiCreatedResponse({ type: Rental })
  rentBook(@Body() createRentalDto: CreateRentalDto): Promise<Rental> {
    return this.rentalService.rentBook(
      createRentalDto.bookId,
      createRentalDto.readerId,
      createRentalDto.dueDate,
    );
  }

  @Put('return/:rentalId')
  @ApiOperation({ summary: 'Return a book' })
  @ApiOkResponse({ type: Rental })
  returnBook(@Param('rentalId') rentalId: string): Promise<Rental> {
    return this.rentalService.returnBook(rentalId);
  }

  @Get('reader/:readerId')
  @ApiOperation({ summary: 'Get rentals by reader' })
  @ApiOkResponse({ type: [Rental] })
  getRentalsByReader(@Param('readerId') readerId: string): Promise<Rental[]> {
    return this.rentalService.getRentalsByReader(readerId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all rentals' })
  @ApiOkResponse({ type: [Rental] })
  getAllRentals(): Promise<Rental[]> {
    return this.rentalService.getAllRentals();
  }

  @Put(':rentalId')
  @ApiOperation({ summary: 'Update a rental' })
  @ApiOkResponse({ type: Rental })
  updateRental(
    @Param('rentalId') rentalId: string,
    @Body() updateRentalDto: UpdateRentalDto,
  ): Promise<Rental> {
    return this.rentalService.update(rentalId, updateRentalDto);
  }
}
