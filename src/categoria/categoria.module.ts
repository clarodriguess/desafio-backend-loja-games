import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Categoria } from "./entitites/categoria.entity";
import { CategoriaController } from "./controllers/categoria.controller";
import { CategoriaService } from "./services/categoria.service";


@Module({
    imports: [TypeOrmModule.forFeature([Categoria])], // chamar a entidade para o modulo
    controllers: [CategoriaController], //classe que vai responder as requisições (rotas) 
    providers: [CategoriaService],//classe q vai prover os serviços (métodos) para o controller
    exports: []
})
export class CategoriaModule {}