import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const newUser = new User();
      newUser.firstName = createUserDto.firstName;
      newUser.lastName = createUserDto.lastName;

      return await this.usersRepository.save(newUser);
    } catch (error) {
      console.log(error);
      throw new HttpException('Unknown', 520);
    }
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOneBy({
      id,
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      await this.usersRepository.update(id, updateUserDto);
    } catch (error) {
      console.log(error);
      throw new HttpException('Unknown', 520);
    }
  }

  async remove(id: number) {
    try {
      await this.usersRepository.delete(id);
    } catch (error) {
      console.log(error);
      throw new HttpException('Unknown', 520);
    }
  }
}
