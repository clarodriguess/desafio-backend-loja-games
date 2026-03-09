import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Produto } from "./entitites/produto.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Produto])], // chamar a entidade para o modulo
    controllers: [], //classe que vai responder as requisições (rotas) 
    providers: [],//classe q vai prover os serviços (métodos) para o controller
    exports: []
})
export class ProdutoModule {}