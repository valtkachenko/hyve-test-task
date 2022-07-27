import { Injectable, HttpException } from '@nestjs/common';
import { CreateToDoListDto } from './dto/create-to-do-list.dto';
import { UpdateToDoListDto } from './dto/update-to-do-list.dto';
import { DataSource, Repository } from 'typeorm';
import { ToDoList } from './entities/to-do-list.entity';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ToDoListService {
  constructor(
    @InjectRepository(ToDoList)
    private toDoListRepository: Repository<ToDoList>,
    private dataSource: DataSource,
  ) {}

  async create(createToDoListDto: CreateToDoListDto): Promise<ToDoList> {
    try {
      const user = await this.dataSource.getRepository(User).findOneBy({
        id: +createToDoListDto.userId,
      });

      if (!user) {
        throw new Error('User not found.');
      }

      const newToDoList = new ToDoList();
      newToDoList.title = createToDoListDto.title;
      newToDoList.user = user;

      return await this.toDoListRepository.save(newToDoList);
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, 400);
    }
  }

  findAll(): Promise<ToDoList[]> {
    return this.toDoListRepository.find({
      relations: {
        toDoItems: true,
      },
    });
  }

  findOne(id: number): Promise<ToDoList> {
    return this.toDoListRepository.findOne({
      where: {
        id,
      },
      relations: {
        toDoItems: true,
      },
    });
  }

  async update(
    id: number,
    updateToDoListDto: UpdateToDoListDto,
  ): Promise<ToDoList> {
    try {
      let user: User;

      if (updateToDoListDto.userId) {
        user = await this.dataSource.getRepository(User).findOneBy({
          id: +updateToDoListDto.userId,
        });

        if (!user) {
          throw new Error('User not found.');
        }
      }
      // eslint-disable-next-line
      const { userId, ...rest } = updateToDoListDto;
      const updatedToDoList = user ? { ...rest, user } : rest;

      await this.toDoListRepository.update(id, updatedToDoList);

      return await this.toDoListRepository.findOneBy({ id });
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, 400);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.toDoListRepository.delete(id);
    } catch (error) {
      console.log(error);
      throw new HttpException('Unknown', 520);
    }
  }
}
