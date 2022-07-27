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
import { CreateToDoItemsDto } from './dto/create-to-do-items.dto';
import { UpdateToDoItemsDto } from './dto/update-to-do-items.dto';
import { ToDoItems } from './entities/to-do-items.entity';
import { ToDoItemsService } from './to-do-items.service';

@Controller('to-do-items')
export class ToDoItemsController {
  constructor(private readonly toDoItemsService: ToDoItemsService) {}

  @Post()
  create(@Body() createToDoItemsDto: CreateToDoItemsDto): Promise<ToDoItems> {
    return this.toDoItemsService.create(createToDoItemsDto);
  }

  @Get()
  findAll(): Promise<ToDoItems[]> {
    return this.toDoItemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ToDoItems> {
    if (isNaN(+id)) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
    return this.toDoItemsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateToDoItemsDto: UpdateToDoItemsDto,
  ): Promise<ToDoItems> {
    if (isNaN(+id)) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
    return this.toDoItemsService.update(+id, updateToDoItemsDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string): Promise<void> {
    return this.toDoItemsService.remove(+id);
  }
}
