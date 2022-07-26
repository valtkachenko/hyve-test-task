import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsNumberString } from 'class-validator';

export class CreateToDoListDto {
  @IsDefined()
  @IsNotEmpty()
  @ApiProperty({
    enum: ['test title', 'test title2', 'test title3'],
  })
  title: string;

  @IsDefined()
  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty({
    enum: ['1', '2', '3'],
  })
  userId: string;
}
