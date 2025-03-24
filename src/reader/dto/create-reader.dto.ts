import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export class CreateReaderDto {
  @ApiProperty({ description: "Reader's first name", example: 'John' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ description: "Reader's last name", example: 'Doe' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ description: 'Reader email address', example: 'planer@solvro.pl' })
  @IsEmail()
  email: string;
}
