import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import { Bcrypt } from '../../auth/bcrypt/bcrypt';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
        private bcrypt: Bcrypt
    ) { }

    //buscar por usuario - pode retornar um usuario ou null
    //NAO VAI TER ENDPOINT NA CONTROLLER, VAI SER USADO SO NA AUTENTICACAO
    //findOne traz apenas um

    async findByUsuario(usuario: string): Promise<Usuario | null> {
        return await this.usuarioRepository.findOne({
            where: {
                usuario: usuario
            }
        })
    }

    //Lista tds os usuarios
    async findAll(): Promise<Usuario[]> {
        return await this.usuarioRepository.find({
          relations:{
            postagem: true
          }
        });

    }

    //Busca um usuario pelo id
    async findById(id: number): Promise<Usuario> {

        const usuario = await this.usuarioRepository.findOne({
            where: {
                id
            },
			relations:{
            	postagem: true
          	}
        });

        if (!usuario)
            throw new HttpException('Usuario não encontrado!', HttpStatus.NOT_FOUND);

        return usuario;

    }

    //Cria um novo usuario
    //nao pode ter 2 usuarios com o mesmo email, entao tem que verificar se o email ja existe antes de criar um novo usuario
    async create(usuario: Usuario): Promise<Usuario> {
        
        const buscaUsuario = await this.findByUsuario(usuario.usuario);

        if (buscaUsuario)
            throw new HttpException("O Usuario já existe!", HttpStatus.BAD_REQUEST);

        //antes de salvar, vai criptografar a senha do usuario usando o bcrypt e depois salva o usuario com a senha criptografada no banco de dados
        usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha) 
        return await this.usuarioRepository.save(usuario);

    }

    //atualizar um usuario
    
    //procura pelo id pra saber se usuario existe
    //busca novamente para saber se o usuario pertence a pessoa correta

    //  Se o usuario não existir, ele vai devolver um not found, usuario não encontrado.
    //  Depois, vamos verificar se o email do usuario que estamos tentando atualizar já existe. 
    // Para isso, vamos usar o método findByUsuario, que criamos ali em cima. 
    // Se o email já existir e for diferente do email do usuario que estamos tentando atualizar,
    //  ele vai devolver um bad request, email já cadastrado. 
    // E por fim, vamos criptografar a senha antes de salvar o usuario atualizado.

    async update(usuario: Usuario): Promise<Usuario> {

        await this.findById(usuario.id);

        const buscaUsuario = await this.findByUsuario(usuario.usuario);

        //verifica se o id da busca é o msm id do usuario, se nao vai duplicar
        if (buscaUsuario && buscaUsuario.id !== usuario.id)
            throw new HttpException('Usuário (e-mail) já Cadastrado!', HttpStatus.BAD_REQUEST);

        //antes de salvar, vai criptografar a senha do usuario usando o bcrypt 
        usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha) //
        return await this.usuarioRepository.save(usuario);

    }

}