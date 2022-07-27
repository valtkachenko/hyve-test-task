import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsNumberString } from 'class-validator';

export class CreateToDoItemsDto {
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty({
    enum: ['Test title'],
  })
  title: string;

  @IsNumberString()
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty({
    enum: ['1'],
  })
  toDoListId: string;
}
