import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Produto } from "./entities/produto.entity";
import { CategoriaModule } from "../categoria/categoria.module";
import { ProdutoService } from "./service/produto.service";
import { CategoriaService } from "../categoria/service/categoria.service";
import { ProdutoController } from "./controller/produto.controller";


@Module({
    imports: [TypeOrmModule.forFeature([Produto]), CategoriaModule],
    providers:[ProdutoService, CategoriaService],
    controllers:[ProdutoController],
    exports:[TypeOrmModule]
})

export class ProdutoModule {}