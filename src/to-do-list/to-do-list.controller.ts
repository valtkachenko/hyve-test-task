import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ToDoListService } from './to-do-list.service';
import { CreateToDoListDto } from './dto/create-to-do-list.dto';
import { UpdateToDoListDto } from './dto/update-to-do-list.dto';
import { ApiBody } from '@nestjs/swagger';
import { ToDoList } from './entities/to-do-list.entity';

@Controller('to-do-list')
export class ToDoListController {
  constructor(private readonly toDoListService: ToDoListService) {}

  @Post()
  create(@Body() createToDoListDto: CreateToDoListDto): Promise<ToDoList> {
    return this.toDoListService.create(createToDoListDto);
  }

  @Get()
  findAll(): Promise<ToDoList[]> {
    return this.toDoListService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ToDoList> {
    if (isNaN(+id)) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
    return this.toDoListService.findOne(+id || 0);
  }

  @Patch(':id')
  @ApiBody({
    description: 'update to-do-list',
    type: CreateToDoListDto,
  })
  update(
    @Param('id') id: string,
    @Body() updateToDoListDto: UpdateToDoListDto,
  ): Promise<ToDoList> {
    if (isNaN(+id)) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
    return this.toDoListService.update(+id, updateToDoListDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string): Promise<void> {
    return this.toDoListService.remove(+id);
  }
}
