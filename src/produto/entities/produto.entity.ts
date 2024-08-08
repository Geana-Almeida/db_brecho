import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Categoria } from "../../categoria/entities/categoria.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";
import {  ApiProperty } from "@nestjs/swagger";

@Entity({name: 'tb_produto'})
export class Produto {

    @PrimaryGeneratedColumn()
    @ApiProperty() 
    id: number

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({name: 'nome', type: 'varchar', length: 255})
    @ApiProperty() 
    nome: string

    @IsNotEmpty()
    @Column({name: 'preco', type: "decimal", precision:8, scale:2})
    @ApiProperty() 
    preco: number

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({name: 'tamanho', type: 'varchar', length: 100})
    @ApiProperty() 
    tamanho: string

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({name: 'foto', type: 'varchar', length: 255})
    @ApiProperty() 
    foto: string

    @ApiProperty({ type: () => Categoria}) 
    @ManyToOne(() => Categoria, (categoria) => categoria.produto, {
        onDelete: "CASCADE"
    })
    categoria: Categoria;

    @ApiProperty({ type: () => Usuario}) 
    @ManyToOne(() => Usuario, (usuario) => usuario.produto, {
        onDelete: "CASCADE"
    })
    usuario: Usuario;
}