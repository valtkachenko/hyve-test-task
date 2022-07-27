import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsNumberString } from 'class-validator';

export class CreateToDoListDto {
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty({
    enum: ['test title', 'test title2', 'test title3'],
  })
  title: string;

  @IsNumberString()
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty({
    enum: ['1', '2', '3'],
  })
  userId: string;
}
