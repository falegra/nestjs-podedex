import { Injectable } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Response } from 'express';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>
  ) {}

  async create(createPokemonDto: CreatePokemonDto, res: Response) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase().trim();

    try {

      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return res.status(201).json(pokemon);
      
    } catch (error) {
      return this.handlException(error, res);
    }

  }

  async findAll(res: Response) {
    const pokemos_db = await this.pokemonModel.find();

    return res.status(200).json(pokemos_db);
  }

  async findOne(id: string, res: Response) {
    let pokemon_db: Pokemon = await this.handlFindPokemon(id);
    
    if(!pokemon_db) {
      return res.status(404).json({
        message: 'Pokemon not found'
      });
    }

    return res.status(200).json(pokemon_db);
  }

  async update(id: string, updatePokemonDto: UpdatePokemonDto, res: Response) {
    let pokemon_db: Pokemon = await this.handlFindPokemon(id);

    if(!pokemon_db) {
      return res.status(404).json({
        message: ''
      })
    }

    updatePokemonDto.name = updatePokemonDto.name.toLowerCase().trim();

    try {
      await this.pokemonModel.findByIdAndUpdate(pokemon_db.id, updatePokemonDto);
    } catch (error) {
      return this.handlException(error, res);
    }

    pokemon_db = await this.pokemonModel.findById(pokemon_db.id);

    return res.status(200).json({
      message: 'Updated Pokemon',
      pokemon: pokemon_db
    });
  }

  async remove(id: string, res: Response) {
    const {deletedCount, acknowledged} = await this.pokemonModel.deleteOne({_id: id});
    if(deletedCount === 0) {
      return res.status(404).json({
        message: `Pokemon with id ${id} not found`
      })
    }
    return res.status(200).json({
      message: `Pokemon deleted`
    });
  }

  private handlException(error: any, res: Response) {
    if(error.code === 11000) {
      return res.status(400).json({
        message: `Pokemon already exists ---- ${JSON.stringify(error.keyValue)}`
      });
    }
    else {
      return res.status(500).json({
        message: `Unknow error ---- Check server logs`
      })
    }
  }

  private async handlFindPokemon(id: string): Promise<Pokemon> {
    let pokemon_db: Pokemon;

    if(Number(id)) {
      pokemon_db = await this.pokemonModel.findOne({no: id});
    }
    else if(isValidObjectId(id)) {
      pokemon_db = await this.pokemonModel.findById(id);
    }
    else {
      pokemon_db = await this.pokemonModel.findOne({name: id.toLowerCase().trim()});
    }

    return pokemon_db;
  }
}
