import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateAuthorDto {
  @ApiProperty({ description: "Author's first name", example: 'John' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ description: "Author's last name", example: 'Doe' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ description: 'Author biography', required: false })
  @IsString()
  @IsOptional()
  bio?: string;
}
