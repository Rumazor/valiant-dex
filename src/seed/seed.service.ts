import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { ValiantResponse } from './interfaces/valiant-response.interface';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;

  async executeSeed() {
    const { data } = await this.axios.get<ValiantResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=10',
    );

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const number: number = +segments[segments.length - 2];
      console.log(name, number);
    });

    data.results.forEach;

    return data.results;
  }
}
