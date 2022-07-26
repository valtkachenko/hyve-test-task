import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsNumberString } from 'class-validator';

export class CreateToDoItemsDto {
  @IsDefined()
  @IsNotEmpty()
  @ApiProperty({
    enum: ['Test title'],
  })
  title: string;

  @IsDefined()
  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty({
    enum: ['1'],
  })
  toDoListId: string;
}
