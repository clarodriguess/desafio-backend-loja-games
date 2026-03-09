import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, Length } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: 'tb_categorias'}) //CREATE TABLE tb_categorias

export class Categoria{
    
    @PrimaryGeneratedColumn() //AUTO INCREMENT
    id: number;
    
    @Transform(({ value } : TransformFnParams) => value?.trim()) //decorador para remover espaços em branco no início e no fim - para o isnotempy nao entrar vazio (pq ele aceita espaco em branco)
    @IsNotEmpty() //validação para não aceitar campos vazios
    @Length(5, 100, {message: 'A descrição do tema deve ter no mínimo 5 e no máximo 100 caracteres'}) //validação para o tamanho do campo 
    @Column({length: 100, nullable: false}) // VARCHAR(100) NOT NULL
    descricao: string;
}