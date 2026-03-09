import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ProdutoService } from "../services/produto.service";
import { Produto } from "../entitites/produto.entity";

@Controller('/produtos')
export class ProdutoController {

    //criar o construtor para injetar o serviço
    constructor(
        private readonly produtoService: ProdutoService
    ){}

    //@get - chama findAll para listar todos os produtos
    @Get()
    async findAll() {
        return await this.produtoService.findAll();
    }

    //@Get - busca por id
    @Get('/:id') //requisições GET '/produtos/:id' : indica que o id é uma variavel de caminho
    @HttpCode(HttpStatus.OK) //esse método vai responder com o status 200 OK como padrao de resposta
    findById(@Param('id', ParseIntPipe) id: number): Promise<Produto> { //o valor q vem no GET() chega como string, entao o ParseIntPipe converte para number
        return this.produtoService.findById(id); 
    }

    //@Get - busca por nome
    @Get('/nome/:nome') //-> /: indica que o nome é uma variavel de caminho --- /nome/ é como uma etiqueta do tipo de busca que estamos fazendo, para diferenciar de outras buscas por atributo que possam existir
    @HttpCode(HttpStatus.OK) 
    findAllByNome(@Param('nome') nome: string): Promise<Produto[]> { 
        return this.produtoService.findAllByNome(nome); 
    }

    //@post - criar um novo produto
    @Post()
    @HttpCode(HttpStatus.CREATED) //status 201 CREATED para indicar que um recurso foi criado com sucesso
    create(@Body() produto: Produto): Promise<Produto> { //o @Body() indica que o produto vai ser recebido no corpo da requisição
        return this.produtoService.create(produto);
    }

    //@put - atualizar um produto existente
    //recebe um objeto do tipo Produto e retorna o produto atualizado
    @Put()
    @HttpCode(HttpStatus.OK) //status 200 OK para indicar que a atualização foi realizada com sucesso
    update(@Body() produto: Produto): Promise<Produto> { //o @Body() indica que o produto atualizado vai ser recebido no corpo da requisição
        return this.produtoService.update(produto);
    }

    //@Delete - deletar um produto existente
    @Delete('/:id') //requisições DELETE '/produtos/:id' : indica que o id é uma variavel de caminho
    @HttpCode(HttpStatus.NO_CONTENT) //status 204 NO CONTENT para indicar que a exclusão foi realizada com sucesso e que não há conteúdo para retornar
    delete(@Param('id', ParseIntPipe) id: number) { //o valor q vem no DELETE() chega como string, entao o ParseIntPipe converte para number
        return this.produtoService.delete(id);
    }

    //desafio - buscar por valor
    //maior que = MoreThan
    @Get('/preco/maior/:preco')
    findAllByPrecoMaiorQue(@Param('preco', ParseIntPipe) preco: number): Promise<Produto[]> {
        return this.produtoService.findAllByPrecoMaiorQue(preco);
    }

}