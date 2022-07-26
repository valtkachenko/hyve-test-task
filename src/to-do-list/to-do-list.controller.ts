import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ToDoListService } from './to-do-list.service';
import { CreateToDoListDto } from './dto/create-to-do-list.dto';
import { UpdateToDoListDto } from './dto/update-to-do-list.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('to-do-list')
export class ToDoListController {
  constructor(private readonly toDoListService: ToDoListService) {}

  @Post()
  create(@Body() createToDoListDto: CreateToDoListDto) {
    return this.toDoListService.create(createToDoListDto);
  }

  @Get()
  findAll() {
    return this.toDoListService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.toDoListService.findOne(+id);
  }

  @Patch(':id')
  @ApiBody({
    description: 'update to-do-list',
    type: CreateToDoListDto,
  })
  update(
    @Param('id') id: string,
    @Body() updateToDoListDto: UpdateToDoListDto,
  ) {
    return this.toDoListService.update(+id, updateToDoListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.toDoListService.remove(+id);
  }
}
