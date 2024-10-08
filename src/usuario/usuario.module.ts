import { TypeOrmModule } from "@nestjs/typeorm";
import { Usuario } from "./entities/usuario.entity";
import { Module } from "@nestjs/common";
import { UsuarioService } from "./service/usuario.service";
import { Bcrypt } from "../auth/bcrypt/bcrypt";
import { UsuarioController } from "./controller/usuario.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Usuario])],
    providers: [UsuarioService, Bcrypt],
    controllers: [UsuarioController],
    exports: [UsuarioService],
})
export class UsuarioModule {}