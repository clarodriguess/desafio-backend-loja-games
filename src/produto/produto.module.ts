import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Produto } from "./entitites/produto.entity";
import { ProdutoController } from "./controllers/produto.controller";
import { ProdutoService } from "./services/produto.service";
import { CategoriaModule } from "../categoria/categoria.module";

@Module({
    imports: [TypeOrmModule.forFeature([Produto]), CategoriaModule], // chamar a entidade para o modulo
    controllers: [ProdutoController], //classe que vai responder as requisições (rotas) 
    providers: [ProdutoService],//classe q vai prover os serviços (métodos) para o controller
    exports: []
})
export class ProdutoModule {}