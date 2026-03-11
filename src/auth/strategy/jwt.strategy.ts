import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "../constants/constants";

//estrategia responsavel por validar o token
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //tira o token da requisicao
            ignoreExpiration: false, //valida se esta no prazo
            secretOrKey: jwtConstants.secret, //valida se a chave de assinatura do token é válida
        });
    }

    async validate(payload: any){
        return payload;
    }
}
