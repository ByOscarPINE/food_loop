import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Food } from './entities/food.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FoodsService {

  constructor(
    @InjectRepository(Food)
    private foodRepository: Repository<Food>
  ) {}

  async create(createFoodDto: CreateFoodDto) {
    const food = this.foodRepository.create(createFoodDto)
    return await this.foodRepository.save(food);
  }

  async findAll() {
    const foods = await this.foodRepository.find()
    return foods;
  } 

  async findOne(id: number) {
    const food = await this.foodRepository.findOneBy({id})
    if(!food) {
      throw new NotFoundException (`comida con el id ${id} no encontrada`)
    }
    return food;
  }

  async update(id: number, updateFoodDto: UpdateFoodDto) {
    const food = await this.foodRepository.findOneBy({id});
    if(!food){
      throw new NotFoundException (`Error al actualziar comida, no se encontro la comida con el id ${id}`)
    }
    const updatedFood = this.foodRepository.merge(food, updateFoodDto)
    return this.foodRepository.save(updatedFood);
  }

  remove(id: number) {
    return `This action removes a #${id} food`;
  }
}