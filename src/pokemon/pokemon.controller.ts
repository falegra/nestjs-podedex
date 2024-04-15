import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Response } from 'express';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  create(@Body() createPokemonDto: CreatePokemonDto, @Res() res: Response) {
    return this.pokemonService.create(createPokemonDto, res);
  }

  @Get()
  findAll(@Res() res: Response) {
    return this.pokemonService.findAll(res);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    return this.pokemonService.findOne(id, res);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePokemonDto: UpdatePokemonDto, @Res() res: Response) {
    return this.pokemonService.update(id, updatePokemonDto, res);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string, @Res() res: Response) {
    return this.pokemonService.remove(id, res);
  }
}
