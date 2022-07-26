import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ToDoList } from '../../to-do-list/entities/to-do-list.entity';

@Entity()
export class ToDoItems {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'boolean', default: false })
  status: boolean;

  @ManyToOne(() => ToDoList, (toDoList) => toDoList.toDoItems)
  toDoList: ToDoList;
}
