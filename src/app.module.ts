import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '123456',
    database: 'db_brecho',
    entities: [],
    synchronize: true,
  }),],
  controllers: [],
  providers: [],
})
export class AppModule {}
