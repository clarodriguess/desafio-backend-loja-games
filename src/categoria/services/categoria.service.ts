import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Categoria } from "../entitites/categoria.entity";
import { ILike, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class CategoriaService {

    //criar o construtor
    constructor(
        @InjectRepository(Categoria) 
        private categoriaRepository: Repository<Categoria>
    ) {}

    //findAll - método para listar todas as categorias
    async findAll(): Promise<Categoria[]> {
        return await this.categoriaRepository.find();
    }

    //findById - método para buscar uma categoria por id
    async findById(id: number): Promise<Categoria> {
            //Guardar a resposta numa const para saber se achou o resultado ou nao
            const categoria = await this.categoriaRepository.findOne({
                where: { id }     
        }) //select * from tb_categorias where id = ?
          if (!categoria) 
            throw new HttpException(`Categoria com id ${id} não encontrada`, HttpStatus.NOT_FOUND); //lançar um erro caso a categoria não seja encontrada
          return categoria;  //se nao tiver erro, retorna a categoria encontrada
        }

    // findAllByDescricao() - retorna um array - método para buscar categorias por nome
    async findAllByDescricao(descricao: string): Promise<Categoria[]> {
        return this.categoriaRepository.find({
            where: {
                descricao: ILike(`%${descricao}%`) //select * from tb_categorias where descricao like '%descricao%'
            },    
        })}   
        
    //create() - método para criar uma nova categoria - recebe um objeto do tipo Categoria e retorna a categoria criada
    async create(categoria: Categoria): Promise<Categoria> {
        return await this.categoriaRepository.save(categoria);
    }

    //update() - método para atualizar uma categoria existente - recebe um objeto do tipo Categoria e retorna a categoria atualizada
    async update(categoria: Categoria): Promise<Categoria> {
        let buscaCategoria = await this.findById(categoria.id); //verificar se a categoria existe no banco de dados
        if (!buscaCategoria) 
            throw new HttpException(`Categoria com id ${categoria.id} não encontrada`, HttpStatus.NOT_FOUND); //lançar um erro caso a categoria não seja encontrada
        return await this.categoriaRepository.save(categoria); //se tiver, salva a atualização da categoria
    }

    //delete() - método para deletar uma categoria existente - recebe o id da categoria a ser deletada e retorna void (aproveitando o método criado para buscar por ID)
    async delete(id: number): Promise<void> {
        let buscaCategoria = await this.findById(id); //verificar se a categoria existe no banco de dados
        if (!buscaCategoria) 
            throw new HttpException(`Categoria com id ${id} não encontrada`, HttpStatus.NOT_FOUND); //lançar um erro caso a categoria não seja encontrada
        await this.categoriaRepository.delete(id); //se tiver, deleta a categoria
    }   
} 