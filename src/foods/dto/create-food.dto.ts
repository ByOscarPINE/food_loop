import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateFoodDto {
    @IsString()
    @IsNotEmpty()
    name!: string
    @IsString()
    @IsNotEmpty()
    description! : string
    @IsNumber()
    @IsNotEmpty()
    price!: number
    @IsString()
    image!: string
    @IsString()
    @IsNotEmpty()
    category!: string
    isAviable!: boolean
}