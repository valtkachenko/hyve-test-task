import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UsersModule } from './users/users.module';
import { ToDoListModule } from './to-do-list/to-do-list.module';
import { ToDoItemsModule } from './to-do-items/to-do-items.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: +process.env.MYSQL_PORT,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    ConfigModule.forRoot(),
    UsersModule,
    ToDoListModule,
    ToDoItemsModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
