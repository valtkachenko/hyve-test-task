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

  async create(createToDoItemsDto: CreateToDoItemsDto) {
    try {
      const toDoList = await this.dataSource.getRepository(ToDoList).findOneBy({
        id: +createToDoItemsDto.toDoListId,
      });

      if (!toDoList) throw Error('ToDoList not found.');

      const newToDoItem = new ToDoItems();
      newToDoItem.title = createToDoItemsDto.title;
      newToDoItem.toDoList = toDoList;

      this.toDoItemsRepository.save(newToDoItem);
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, 400);
    }
  }

  findAll() {
    return this.toDoItemsRepository.find({
      relations: ['toDoList', 'toDoList.user'],
    });
  }

  findOne(id: number) {
    return this.toDoItemsRepository.findOne({
      where: { id },
      relations: ['toDoList', 'toDoList.user'],
    });
  }

  async update(id: number, updateToDoItem: UpdateToDoItemsDto) {
    try {
      let toDoList: ToDoList;

      if (updateToDoItem.toDoListId) {
        toDoList = await this.dataSource.getRepository(ToDoList).findOneBy({
          id: +updateToDoItem.toDoListId,
        });

        if (!toDoList) throw Error('User not found.');
      }

      const { toDoListId, ...rest } = updateToDoItem;
      const updatedToDoItem = toDoList ? { ...rest, toDoList } : rest;

      await this.toDoItemsRepository.update(id, updatedToDoItem);
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, 400);
    }
  }

  async remove(id: number) {
    try {
      await this.toDoItemsRepository.delete(id);
    } catch (error) {
      console.log(error);
      throw new HttpException('Unknown', 520);
    }
  }
}
