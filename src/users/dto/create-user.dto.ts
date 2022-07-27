import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty({
    enum: ['Thimotei'],
  })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty({
    enum: ['Jhone'],
  })
  lastName: string;
}
