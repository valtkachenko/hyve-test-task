import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  @ApiProperty({
    enum: ['Thimotei'],
  })
  firstName: string;

  @IsNotEmpty()
  @IsDefined()
  @IsString()
  @ApiProperty({
    enum: ['Jhone'],
  })
  lastName: string;
}
