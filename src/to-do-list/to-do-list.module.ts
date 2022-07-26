import { Module } from '@nestjs/common';
import { ToDoListService } from './to-do-list.service';
import { ToDoListController } from './to-do-list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToDoList } from './entities/to-do-list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ToDoList])],
  controllers: [ToDoListController],
  providers: [ToDoListService],
})
export class ToDoListModule {}
