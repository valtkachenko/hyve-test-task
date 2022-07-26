import { Entity, PrimaryGeneratedColumn, Column, JoinTable, OneToMany } from 'typeorm';
import { ToDoList } from '../../to-do-list/entities/to-do-list.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: false })
  isActive: boolean;

  @OneToMany(() => ToDoList, (toDoList) => toDoList.user, {
    cascade: true,
  })
  @JoinTable()
  toDoLists: ToDoList[];
}
