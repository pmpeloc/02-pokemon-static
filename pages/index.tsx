import { NextPage, GetStaticProps } from 'next';
import { Grid } from '@nextui-org/react';

import { Layout } from '../components/layouts';
import { IPokemonListResponse, ISmallPokemon } from '../interfaces';
import { pokeApi } from '../services';
import { PokemonCard } from '../components/pokemon';

interface Props {
  pokemons: ISmallPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
  return (
    <Layout title='Listado de Pokemons'>
      <Grid.Container gap={2} justify='flex-start'>
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </Grid.Container>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<IPokemonListResponse>(
    '/pokemon?limit=151'
  );
  const urlImg =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/';
  const pokemons: ISmallPokemon[] = data.results.map(
    (pokemon: any, index: number) => ({
      ...pokemon,
      id: ++index,
      img: `${urlImg}${index}.svg`,
    })
  );

  return {
    props: {
      pokemons,
    },
  };
};

export default HomePage;
