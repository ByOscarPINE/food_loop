import { IsNotEmpty, IsString } from "class-validator";

export class login {
    @IsString()
    @IsNotEmpty()
    email!: string;
    @IsString()
    @IsNotEmpty()
    password!: string;
}