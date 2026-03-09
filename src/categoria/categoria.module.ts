import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Categoria } from "./entitites/categoria.entity";


@Module({
    imports: [TypeOrmModule.forFeature([Categoria])], // chamar a entidade para o modulo
    controllers: [], //classe que vai responder as requisições (rotas) 
    providers: [],//classe q vai prover os serviços (métodos) para o controller
    exports: []
})
export class CategoriaModule {}