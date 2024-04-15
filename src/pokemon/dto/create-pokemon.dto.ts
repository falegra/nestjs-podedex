import { IsDefined, IsInt, IsPositive, IsString, Min, MinLength } from "class-validator"

export class CreatePokemonDto {
    @IsDefined()
    @IsInt()
    @IsPositive()
    @Min(1)
    no: number

    @IsDefined()
    @IsString()
    @MinLength(1)
    name: string
}
