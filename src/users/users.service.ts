import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private dataSource: DataSource,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
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

  async findAll(): Promise<User[]> {
    return await this.dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.toDoLists', 'toDoLists')
      .leftJoinAndSelect('toDoLists.toDoItems', 'items')
      .getMany();
  }

  async findOne(id: number): Promise<User> {
    return await this.dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.toDoLists', 'toDoLists')
      .leftJoinAndSelect('toDoLists.toDoItems', 'items')
      .where('user.id = :id', { id })
      .getOne();
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      await this.usersRepository.update(id, updateUserDto);

      return await this.usersRepository.findOneBy({ id });
    } catch (error) {
      console.log(error);
      throw new HttpException('Unknown', 520);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.usersRepository.delete(id);
    } catch (error) {
      console.log(error);
      throw new HttpException('Unknown', 520);
    }
  }
}
