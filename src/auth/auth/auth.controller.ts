import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto } from 'src/users/dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor (
        private authservice : AuthService
    ) {

    }

    @Post('login')
    login( @Body() dto: loginDto){
        return this.authservice.login(dto)
    }
}
