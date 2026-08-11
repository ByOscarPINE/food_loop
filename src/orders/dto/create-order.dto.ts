import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateOrderDto {
        @IsNotEmpty()
        @IsNumber()
        userid!: number
        @IsNotEmpty()
        @IsBoolean()
        status!: boolean
        @IsNotEmpty()
        @IsNumber()
        total!: number
        @IsNotEmpty()
        @IsString()
        notas!: string
}
