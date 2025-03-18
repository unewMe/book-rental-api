import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export class CreateReaderDto {
  @ApiProperty({ description: "Reader's first name" })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ description: "Reader's last name" })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ description: 'Reader email address' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Reader phone number', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ description: 'Reader address', required: false })
  @IsOptional()
  @IsString()
  address?: string;
}
