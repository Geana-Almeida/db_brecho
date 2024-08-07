import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Produto } from "../entities/produto.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { CategoriaService } from "../../categoria/service/categoria.service";

@Injectable()
export class ProdutoService {
    constructor(
        @InjectRepository(Produto)
        private produtoRepository: Repository<Produto>,
        private categoriaService: CategoriaService
    ) { }

    async findAll():Promise<Produto[]>{
        return await this.produtoRepository.find({
            relations:{
                categoria: true
            }
        })
    }

    async findById(id:number): Promise<Produto>{
        let buscarProduto = await this.produtoRepository.findOne({
            where:{
                id
            },
            relations:{
                categoria: true
            }
        })

        if(!buscarProduto){
            throw new HttpException("Produto não encontrado!", HttpStatus.BAD_REQUEST)
        }

        return buscarProduto
    }

    async findByNome(nome: string): Promise<Produto[]>{
        let buscarNome = await this.produtoRepository.find({
            where:{
                nome: ILike(`%${nome}%`)
            },
            relations:{
                categoria: true
            }
        })

        return buscarNome;
    }

    async create(produto: Produto): Promise<Produto>{
        let verificarCategoria = await this.categoriaService.findById(produto.categoria.id)

        if(produto.id){
            throw new HttpException("Não informe o ID!", HttpStatus.BAD_REQUEST)
        }

        if(!verificarCategoria){
            throw new HttpException("Categoria não encontrado! ", HttpStatus.NOT_FOUND)
        }

        return await this.produtoRepository.save(produto);
    }

    async update(produto: Produto): Promise<Produto>{
        let verificarId = await this.findById(produto.id);
        let verificarCategoria = await this.categoriaService.findById(produto.categoria.id)

        if(!verificarId){
            throw new HttpException("Produto não encontrado! ", HttpStatus.NOT_FOUND)
        }

        if(!verificarCategoria){
            throw new HttpException("Categoria não encontrado! ", HttpStatus.NOT_FOUND)
        }

        await this.produtoRepository.createQueryBuilder().update(produto).where(`id = ${produto.id}`).execute()

        return produto;
    }

    async delete(id: number):Promise<DeleteResult>{
        let buscarProduto = await this.findById(id);

        if(!buscarProduto){
            throw new HttpException("Produto não encontrado!", HttpStatus.NOT_FOUND)
        }

        return await this.produtoRepository.delete(id);
    }
}