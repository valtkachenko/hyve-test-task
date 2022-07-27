import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ToDoList } from 'src/to-do-list/entities/to-do-list.entity';
import { Repository, DataSource } from 'typeorm';
import { CreateToDoItemsDto } from './dto/create-to-do-items.dto';
import { UpdateToDoItemsDto } from './dto/update-to-do-items.dto';
import { ToDoItems } from './entities/to-do-items.entity';

@Injectable()
export class ToDoItemsService {
  constructor(
    @InjectRepository(ToDoItems)
    private toDoItemsRepository: Repository<ToDoItems>,
    private dataSource: DataSource,
  ) {}

  async create(createToDoItemsDto: CreateToDoItemsDto): Promise<ToDoItems> {
    try {
      const toDoList = await this.dataSource.getRepository(ToDoList).findOneBy({
        id: +createToDoItemsDto.toDoListId,
      });

      if (!toDoList) {
        throw new Error('ToDoList not found.');
      }

      const newToDoItem = new ToDoItems();
      newToDoItem.title = createToDoItemsDto.title;
      newToDoItem.toDoList = toDoList;

      return this.toDoItemsRepository.save(newToDoItem);
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, 400);
    }
  }

  findAll(): Promise<ToDoItems[]> {
    return this.toDoItemsRepository.find({
      relations: ['toDoList', 'toDoList.user'],
    });
  }

  findOne(id: number): Promise<ToDoItems> {
    return this.toDoItemsRepository.findOne({
      where: { id },
      relations: ['toDoList', 'toDoList.user'],
    });
  }

  async update(
    id: number,
    updateToDoItem: UpdateToDoItemsDto,
  ): Promise<ToDoItems> {
    try {
      let toDoList: ToDoList;

      if (updateToDoItem.toDoListId) {
        toDoList = await this.dataSource.getRepository(ToDoList).findOneBy({
          id: +updateToDoItem.toDoListId,
        });

        if (!toDoList) {
          throw new Error('User not found.');
        }
      }

      // eslint-disable-next-line
      const { toDoListId, ...rest } = updateToDoItem;

      const updatedToDoItem = toDoList ? { ...rest, toDoList } : rest;

      await this.toDoItemsRepository.update(id, updatedToDoItem);

      return await this.toDoItemsRepository.findOneBy({
        id,
      });
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, 400);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.toDoItemsRepository.delete(id);
    } catch (error) {
      console.log(error);
      throw new HttpException('Unknown', 520);
    }
  }
}
