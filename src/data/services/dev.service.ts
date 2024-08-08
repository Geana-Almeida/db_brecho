import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { Categoria } from "../../categoria/entities/categoria.entity";
import { Produto } from "../../produto/entities/produto.entity";

@Injectable()
export class DevService implements TypeOrmOptionsFactory {

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: '123456',
            database: 'db_brecho',
            entities: [Categoria, Produto, Usuario],
            synchronize: true,
    };
  }
}