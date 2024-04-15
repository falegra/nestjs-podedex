import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.URI_MONGODB),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../public')
    }),
    PokemonModule,
    CommonModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
