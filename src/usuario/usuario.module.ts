import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { UsuarioService } from './services/usuario.service';
import { AuthModule } from '../auth/auth.module';
import { UsuarioController } from './controllers/usuario.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario]), 
  forwardRef(() =>  AuthModule)], 
  //fowardRef para evitar lopping infito entre os módulos 
  // pq authModule é chamado por usuarioModule e UsuarioMOdule é chamado por authModule
  providers: [UsuarioService],
  controllers: [UsuarioController],
  exports: [UsuarioService],
})
export class UsuarioModule {}