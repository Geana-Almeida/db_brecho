import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Categoria } from "../entities/categoria.entity";
import { DeleteResult, ILike, Repository } from "typeorm";

@Injectable()
export class CategoriaService {
    constructor( 
        @InjectRepository(Categoria)
        private categoriaRepository: Repository<Categoria>
    ) {}

    async findAll():Promise<Categoria[]>{
        return await this.categoriaRepository.find({

        })
    }

    async findById(id:number): Promise<Categoria>{
        let buscarCategoria = await this.categoriaRepository.findOne({
            where:{
                id
            }
        })

        if(!buscarCategoria){
            throw new HttpException("Categoria não encontrada! ", HttpStatus.NOT_FOUND)
        }

        return buscarCategoria;
    }
    

    async findByCategoriaTipo(tipo: string):Promise<Categoria[]>{
        let buscarTipo = await this.categoriaRepository.find({
            where:{
                tipo: ILike(`%${tipo}%`)
            }
        })

        return buscarTipo
    }

    async create(categoria: Categoria):Promise<Categoria>{
        if(categoria.id){
            throw new HttpException("Não informe o ID!", HttpStatus.BAD_REQUEST)
        }
        return await this.categoriaRepository.save(categoria);
    }

    async update(categoria: Categoria):Promise<Categoria>{
        let verificarId = await this.findById(categoria.id);

        if(!verificarId){
            throw new HttpException("Categoria Não encontrada!", HttpStatus.NOT_FOUND)
        }

        await this.categoriaRepository.createQueryBuilder().update(categoria).where(`id = ${categoria.id}`).execute()

        return categoria
    }

    async delete(id: number): Promise<DeleteResult>{
        let buscarCategoria = await this.findById(id);

        if(!buscarCategoria){
            throw new HttpException("Cartao não encontrado!", HttpStatus.NOT_FOUND)
        }

        return await this.categoriaRepository.delete(id);
    }
}