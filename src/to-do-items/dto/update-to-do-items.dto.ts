import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDefined, IsNotEmpty, IsOptional } from 'class-validator';
import { CreateToDoItemsDto } from './create-to-do-items.dto';

export class UpdateToDoItemsDto extends PartialType(CreateToDoItemsDto) {
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({
    enum: [true, false],
  })
  status?: boolean;
}
