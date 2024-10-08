import { Transform, TransformFnParams } from "class-transformer"
import { IsEmail, IsNotEmpty, MinLength } from "class-validator"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Produto } from "../../produto/entities/produto.entity"
import { ApiProperty } from "@nestjs/swagger"

@Entity({name: "tb_usuarios"})
export class Usuario {
 
    @PrimaryGeneratedColumn() 
    @ApiProperty() 
    public id: number
 
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length: 255, nullable: false}) 
    @ApiProperty() 
    public nome: string
 
    @IsEmail()
    @IsNotEmpty()
    @Column({length: 255, nullable: false })
    @ApiProperty({example: "email@email.com.br"}) 
    public usuario: string
 
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @MinLength(8)
    @IsNotEmpty()
    @Column({length: 255, nullable: false }) 
    @ApiProperty() 
    public senha: string

    @Column({length: 5000})
    @ApiProperty() 
    foto: string

    @ApiProperty() 
    @OneToMany(() => Produto, (produto) => produto.usuario)
    produto: Produto[]

}