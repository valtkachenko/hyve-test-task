import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToDoItems } from './entities/to-do-items.entity';
import { ToDoItemsController } from './to-do-items.controller';
import { ToDoItemsService } from './to-do-items.service';

@Module({
  imports: [TypeOrmModule.forFeature([ToDoItems])],
  controllers: [ToDoItemsController],
  providers: [ToDoItemsService],
})
export class ToDoItemsModule {}
