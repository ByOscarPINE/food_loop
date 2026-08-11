import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Food } from './entities/food.entity';
import { Repository } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';
@Injectable()
export class FoodsService {

  constructor(
    @InjectRepository(Food)
    private foodRepository: Repository<Food>,
    
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    
  ) {}

  async create(createFoodDto: CreateFoodDto) {
    const category = await this.categoryRepository.findOneBy({id: createFoodDto.category})
    if(!category)
      throw new NotFoundException("categoria no encontrada")
    const food = this.foodRepository.create({...createFoodDto, category})
    return await this.foodRepository.save(food);
  }

  async findAll() {
    const foods = await this.foodRepository.find({
      relations: {category:true}
    })
    return foods;
  } 

  async findAllByName(name: string) {
    const foods = await this.foodRepository.find({
      where: { name },
      relations: { category: true },
    });
    return foods;
  }

  async findAllByCategory(categoryName: string) {
    const foods = await this.foodRepository.find({
      where: { category: { name: categoryName } },
      relations: { category: true },
    });
    return foods;
  }

  async findAllByFilters(filters: { category?: string; name?: string }) {
    const where: any = {};

    if (filters.name) {
      where.name = filters.name;
    }

    if (filters.category) {
      where.category = { name: filters.category };
    }

    const foods = await this.foodRepository.find({
      where,
      relations: { category: true },
    });

    return foods;
  } 

  async findOne(id: number) {
    const food = await this.foodRepository.findOne({where: {id}, relations: {category: true}})
    if(!food) 
      throw new NotFoundException (`comida con el id ${id} no encontrada`)
    return food;
  }

  async update(id: number, updateFoodDto: UpdateFoodDto) {
    const food = await this.foodRepository.findOneBy({id});
    if(!food)
      throw new NotFoundException (`Error al actualziar comida, no se encontro la comida con el id ${id}`)
    const category = await this.categoryRepository.findOneBy({id: updateFoodDto.category})
    if(!category)
      throw new NotFoundException("categoria no encontrada")
    const updatedFood = this.foodRepository.merge(food, {...updateFoodDto, category})
    return this.foodRepository.save(updatedFood);
  }

  async updateImage(id: number, image : Express.Multer.File) {
    const food = await this.foodRepository.findOneBy({id});
    if(!food)
      throw new NotFoundException (`Error al actualziar la imagen de la comida, no se encontro la comida con el id ${id}`)
    const updatedFood = this.foodRepository.merge(food, {...food, image: image.filename})
    return this.foodRepository.save(updatedFood);
  }

  remove(id: number) {
    return `This action removes a #${id} food`;
  }


}