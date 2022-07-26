import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsDefined()
  @IsString()
  lastName: string;
}
