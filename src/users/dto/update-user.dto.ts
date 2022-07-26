import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  isActive?: boolean;
}
