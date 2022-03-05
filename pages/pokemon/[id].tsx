import { NextPage, GetStaticProps, GetStaticPaths } from 'next';

import { Layout } from '../../components/layouts';
import { IPokemon } from '../../interfaces';
import { pokeApi } from '../../services';

interface Props {
  pokemon: IPokemon;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  return (
    <Layout title='asd'>
      <h1>{pokemon.name}</h1>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const pokemons151 = [...Array(151)].map((value, index) => `${index + 1}`);
  return {
    paths: pokemons151.map((id) => ({
      params: { id },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };
  const { data } = await pokeApi.get<IPokemon>(`/pokemon/${id}`);
  return {
    props: {
      pokemon: data,
    },
  };
};

export default PokemonPage;
