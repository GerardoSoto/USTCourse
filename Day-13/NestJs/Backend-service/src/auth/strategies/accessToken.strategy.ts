
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';


//!Que significa esto? Crean un nuevo tipo anonimo?
type JwtPayload = {
  sub: string;
  username: string;
};

@Injectable()
export class AccessTokenStratey extends PassportStrategy(Strategy, 'jwt'){
  constructor(configService: ConfigService){
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('ACCESS_TOKEN_SECRET'),
    });
  }

  validate(payload: JwtPayload){
    return payload;
  }
}