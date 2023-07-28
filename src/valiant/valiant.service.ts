import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateValiantDto } from './dto/create-valiant.dto';
import { UpdateValiantDto } from './dto/update-valiant.dto';
import { Model, isValidObjectId } from 'mongoose';
import { Valiant } from './entities/valiant.entity';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ValiantService {
  private defaultLimit: number;

  constructor(
    @InjectModel(Valiant.name)
    private readonly ValiantModel: Model<Valiant>,

    private readonly configService: ConfigService,
  ) {
    this.defaultLimit = configService.get('defaultLimit');
  }

  async create(createValiantDto: CreateValiantDto) {
    createValiantDto.name = createValiantDto.name.toLocaleLowerCase();
    try {
      const valiant = await this.ValiantModel.create(createValiantDto);
      return valiant;
    } catch (error) {
      this.handleException(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = this.defaultLimit, offset = 0 } = paginationDto;

    return await this.ValiantModel.find()
      .limit(limit)
      .skip(offset)
      .sort({
        number: 1,
      })
      .select('-__v');
  }

  async findOne(term: string) {
    let valiant: Valiant;

    //Number
    if (!isNaN(+term)) {
      valiant = await this.ValiantModel.findOne({ number: term });
    }
    //MongoID
    if (!valiant && isValidObjectId(term)) {
      valiant = await this.ValiantModel.findById(term);
    }
    //Name
    if (!valiant) {
      valiant = await this.ValiantModel.findOne({
        name: term.toLocaleLowerCase().trim(),
      });
    }

    if (!valiant)
      throw new NotFoundException(
        `Valiant with id,name or number ${term} not found`,
      );

    return valiant;
  }

  async update(term: string, updateValiantDto: UpdateValiantDto) {
    const valiant = await this.findOne(term);
    if (updateValiantDto.name)
      updateValiantDto.name = updateValiantDto.name.toLocaleLowerCase();

    try {
      await valiant.updateOne(updateValiantDto);
      return { ...valiant.toJSON(), ...updateValiantDto };
    } catch (error) {
      this.handleException(error);
    }
  }

  async remove(id: string) {
    // const valiant = await this.findOne(id);
    // await valiant.deleteOne();
    // const result = await this.ValiantModel.findByIdAndDelete(id);

    //EVITAR HACER DOBLE CONSULTA A LA DB

    const { deletedCount } = await this.ValiantModel.deleteOne({
      _id: id,
    });

    if (deletedCount === 0) {
      throw new BadRequestException(`Valiant with id ${id} not found`);
    }

    return;
  }

  // handle errors
  private handleException(error: any) {
    console.log(error);
    if (error.code == 11000) {
      throw new BadRequestException(
        `Valiant already exists in database ${JSON.stringify(error.keyValue)}`,
      );
    }
    throw new InternalServerErrorException(
      `Cant create Valiant -  Check server logs`,
    );
  }
}
