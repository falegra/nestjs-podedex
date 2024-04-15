import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { Response } from 'express';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios;

  constructor(
    
  ) {}

  async executeSeed(res: Response) {
    const {data} = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10');

    data.results.forEach(({name, url}) => {
      const segments = url.split('/');
      const no: number = Number(segments[segments.length -2]);
      console.log(name, no);
    });

    return res.status(200).json(data.results);
  }

}
