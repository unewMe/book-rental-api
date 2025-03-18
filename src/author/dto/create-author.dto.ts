import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateAuthorDto {
  @ApiProperty({ description: "Author's first name" })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ description: "Author's last name" })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ description: 'Author biography', required: false })
  @IsString()
  @IsOptional()
  bio?: string;
}
