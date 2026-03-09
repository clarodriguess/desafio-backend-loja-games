import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { CategoriaService } from "../services/categoria.service";
import { Categoria } from "../entitites/categoria.entity";


@Controller('/categorias')
export class CategoriaController {

    //criar o construtor para injetar o serviço
    constructor(
        private readonly categoriaService: CategoriaService
    ){}

    //@get - chama findAll para listar todas as categorias
    @Get()
    async findAll() {
        return await this.categoriaService.findAll();
    }

    //@Get - busca por id
    @Get('/:id') //requisições GET '/categorias/:id' : indica que o id é uma variavel de caminho
    @HttpCode(HttpStatus.OK) //esse método vai responder com o status 200 OK como padrao de resposta
    findById(@Param('id', ParseIntPipe) id: number): Promise<Categoria> { //o valor q vem no GET() chega como string, entao o ParseIntPipe converte para number
        return this.categoriaService.findById(id); 
    }

    //@Get - busca por descricao
    @Get('/descricao/:descricao') //-> /: indica que a descricao é uma variavel de caminho --- /descricao/ é como uma etiqueta do tipo de busca que estamos fazendo, para diferenciar de outras buscas por atributo que possam existir
    @HttpCode(HttpStatus.OK) 
    findAllByDescricao(@Param('descricao') descricao: string): Promise<Categoria[]> { 
        return this.categoriaService.findAllByDescricao(descricao); 
    }

    //@post - criar uma nova categoria
    @Post()
    @HttpCode(HttpStatus.CREATED) //status 201 CREATED para indicar que um recurso foi criado com sucesso
    create(@Body() categoria: Categoria): Promise<Categoria> { //o @Body() indica que a categoria vai ser recebida no corpo da requisição
        return this.categoriaService.create(categoria);
    }

    //@put - atualizar uma categoria existente
    //recebe um objeto do tipo Categoria e retorna a categoria atualizada
    @Put()
    @HttpCode(HttpStatus.OK) //status 200 OK para indicar que a atualização foi realizada com sucesso       
    update(@Body() categoria: Categoria): Promise<Categoria> { //o @Body() indica que a categoria atualizada vai ser recebida no corpo da requisição
        return this.categoriaService.update(categoria);
    }

    //@Delete - deletar uma categoria existente
    @Delete('/:id') //requisições DELETE '/categorias/:id' : indica que o id é uma variavel de caminho
    @HttpCode(HttpStatus.NO_CONTENT) //status 204 NO CONTENT para indicar que a exclusão foi realizada com sucesso e que não há conteúdo para retornar
    delete(@Param('id', ParseIntPipe) id: number): Promise<void> { //o valor q vem no DELETE() chega como string, entao o ParseIntPipe converte para number
        return this.categoriaService.delete(id);
    }
    

}