import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateToDoItemsDto } from './dto/create-to-do-items.dto';
import { UpdateToDoItemsDto } from './dto/update-to-do-items.dto';
import { ToDoItemsService } from './to-do-items.service';

@Controller('to-do-items')
export class ToDoItemsController {
  constructor(private readonly toDoItemsService: ToDoItemsService) {}

  @Post()
  create(@Body() createToDoItemsDto: CreateToDoItemsDto) {
    return this.toDoItemsService.create(createToDoItemsDto);
  }

  @Get()
  findAll() {
    return this.toDoItemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.toDoItemsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateToDoItemsDto: UpdateToDoItemsDto,
  ) {
    return this.toDoItemsService.update(+id, updateToDoItemsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.toDoItemsService.remove(+id);
  }
}
