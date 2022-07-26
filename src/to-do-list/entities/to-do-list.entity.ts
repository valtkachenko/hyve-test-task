import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ToDoItems } from '../../to-do-items/entities/to-do-items.entity';

@Entity()
export class ToDoList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => User, (user) => user.toDoLists)
  user: User;

  @OneToMany(() => ToDoItems, (toDoItem) => toDoItem.toDoList)
  toDoItems: ToDoItems[];
}
