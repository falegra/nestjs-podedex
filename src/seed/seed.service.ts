import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { Response } from 'express';
import { PokeResponse } from './interfaces/poke-response.interface';
import { PokemonService } from 'src/pokemon/pokemon.service';

@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios;

  constructor(
    private readonly pokemonService: PokemonService
  ) {}

  async executeSeed(res: Response) {
    await this.pokemonService.handleDeleteAllPokemons();

    const {data} = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=300');

    data.results.forEach(async ({name, url}) => {
      const segments = url.split('/');
      const no: number = Number(segments[segments.length -2]);
      
      const status = await this.pokemonService.handleCreatePokemon({no, name});
    });

    return res.status(200).json({
      message: 'Seed executed'
    });
  }

}
