export interface Pokemon {
    id: number;
    name: string;
    picture: string;
    weight: number;
    height: number;
    sprites: Sprites
    types: GetPokemonTypeResult[];
    stats: Stat[];
}

export interface Type {
    name: string;
    url: string
}

export interface GetPokemonResult {
    count: number;
    next: string;
    previois: string;
    results: Pokemon[];
}

export interface GetPokemonTypeResult {
    slot: number;
    type: Type;
}

export interface Sprites {
    front_default: string;
}

export interface Stat {
    base_stat: number;
    effort: number;
    stat: Statinfo;
}

export interface Statinfo {
    name: string;
    url: string;
}

