import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { loginDto } from '../../users/dto/login.dto';
import * as bcrypt from 'bcrypt';
import { access } from 'fs';

@Injectable()
export class AuthService {
    constructor (
        private userserice : UsersService,
        private jwtservice : JwtService
    ){}

    async login (data : loginDto) {
        const user = await this.userserice.findByEmail(data.email)
        if(!user) throw new UnauthorizedException('Credenciales invalidas')
        const match = await bcrypt.compare(data.password, user.password)
        if(!match) throw new UnauthorizedException('Credenciales invalidas')
        const payload = { sub: user.id, email: user.email}
        return {access_token: this.jwtservice.sign(payload), user: {id: user.id, name:user.name}}
    }
}
