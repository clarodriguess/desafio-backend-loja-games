import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Produto } from "../entitites/produto.entity";
import { ILike, MoreThan, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult } from "typeorm/browser";
import { CategoriaService } from "../../categoria/services/categoria.service";

@Injectable()
export class ProdutoService {

    //criar o construtor
    constructor(
        @InjectRepository(Produto) 
        private produtoRepository: Repository<Produto>,
        private readonly categoriaService: CategoriaService // injetar a categoriaService para verificar se a categoria existe no banco de dados quando for criar ou atualizar um produto
    ) {}

    //findAll - metodo para listar todos os produtos
    async findAll(): Promise<Produto[]> {
        return await this.produtoRepository.find({
            relations: {
                categoria: true
            }
        });
    }

    //metodo para listar uma postagem por id - findOne() - retorna um objeto
    async findById(id: number): Promise<Produto> {
        //Guardar a resposta numa const para saber se achou o resultado ou nao
        const produto = await this.produtoRepository.findOne({
            where: { id },
            relations: {
                categoria: true
            }     
    }) //select * from tb_produtos where id = ?
      if (!produto) 
        throw new HttpException(`Produto com id ${id} não encontrado`, HttpStatus.NOT_FOUND); //lançar um erro caso o produto não seja encontrado
      return produto;  //se nao tiver erro, retorna o produto encontrado
    }

    //metodo de busca por atributo especifico - findAllByNome() - retorna um array de Produto
    async findAllByNome(nome: string): Promise<Produto[]> {
        return this.produtoRepository.find({
            where: {
                nome: ILike(`%${nome}%`) //select * from tb_produtos where nome like '%nome%'
            },
            relations: {
                categoria: true
            }   
        })}

    //metodo para criar um novo produto - create() - recebe um objeto do tipo Produto e retorna o produto criado
    async create(produto: Produto): Promise<Produto> {
        
        this.categoriaService.findById(produto.categoria.id); //verificar se a categoria existe no banco de dados, aproveitando o método criado para buscar por ID na categoria
        
        return await this.produtoRepository.save(produto);
    }

   //metodo para atualizar um produto existente - 
   // update() -> recebe um objeto do tipo Produto e retorna o produto atualizado
    async update(produto: Produto): Promise<Produto> {
        let buscaProduto = await this.findById(produto.id); //verificar se o produto existe no banco de dados
        if (!buscaProduto) 
            throw new HttpException(`Produto com id ${produto.id} não encontrado`, HttpStatus.NOT_FOUND); //lançar um erro caso o produto não seja encontrado
        
        await this.findById(produto.id); //checa se o produto existe
        await this.categoriaService.findById(produto.categoria.id) // checa se a categoria existe
        
        return await this.produtoRepository.save(produto); //se tiver, salva a atualização do produto
    }

    //delete() metodo para deletar um produto existente 
    // recebe o id do produto a ser deletado e retorna void (aproveitando o metodo criado para buscar por ID)
    async delete(id: number): Promise<DeleteResult> {
        await this.findById(id); //verificar se o produto existe no banco de dados
        return await this.produtoRepository.delete(id);  //delete from tb_postagens where id = ?
    }

    //desafio - metodo extra
    //buscar produtos por faixa de preço, maior que = MoreThan do TypeORM
    async findAllByPrecoMaiorQue(preco: number): Promise<Produto[]> {
           return this.produtoRepository.find({
        where: {
            preco: MoreThan(preco)
        },
        relations: {
            categoria: true
        }
    });
    }

    
}  