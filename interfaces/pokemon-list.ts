export interface IPokemonListResponse {
  count: number;
  next?: string;
  previous?: string;
  results: ISmallPokemon[];
}

export interface ISmallPokemon {
  name: string;
  url: string;
  id: number;
  img: string;
}
