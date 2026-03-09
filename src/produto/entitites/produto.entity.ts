import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, IsNumber, IsPositive, Length } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { NumericTransformer } from "../../util/numerictransformer";


@Entity({name: "tb_produto"}) //create table "tb_produtos"

export class Produto { //atributos da tabela
    
    @PrimaryGeneratedColumn() //equivalente a um AUTO INCREMENT
    id: number

    @Transform(({ value } : TransformFnParams) => value?.trim()) //decorador para remover espaços em branco no início e no fim - para o isnotempy nao entrar vazio (pq ele aceita espaco em branco)
    @IsNotEmpty() //validação para não aceitar campos vazios
    @Length(5, 255, {message: 'O nome deve ter no mínimo 5 e no máximo 255 caracteres'}) //validação para o campo ter no mínimo 5 caracteres e no máximo 255 caracteres
    @Column({length: 255, nullable: false}) // VARCHAR(255) NOT NULL
    nome: string;

    @IsNumber() //validação para aceitar apenas números
    @IsNotEmpty() //validação para não aceitar campos vazios
    @IsPositive() //validação para aceitar apenas números positivos
    @Column({type: "decimal", precision: 10, scale: 2, transformer: new NumericTransformer()}) // DECIMAL(10,2) NOT NULL
    preco: number;

    @Column()
    foto: string;
}
