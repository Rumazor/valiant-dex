import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { ValiantResponse } from './interfaces/valiant-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Valiant } from 'src/valiant/entities/valiant.entity';
import { Model } from 'mongoose';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Valiant.name)
    private readonly ValiantModel: Model<Valiant>,
  ) {}

  private readonly axios: AxiosInstance = axios;

  async executeSeed() {
    await this.ValiantModel.deleteMany({}); // delete all
    const { data } = await this.axios.get<ValiantResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=151',
    );

    const valiantToInsert: { name: string; number: number }[] = [];

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const number = +segments[segments.length - 2];
      valiantToInsert.push({ name, number });
    });

    await this.ValiantModel.insertMany(valiantToInsert);

    return 'Seed executed';
  }
}
