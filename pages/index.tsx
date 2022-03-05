import { NextPage, GetStaticProps } from 'next';
import { Layout } from '../components/layouts';
import { IPokemonListResponse, ISmallPokemon } from '../interfaces';
import { pokeApi } from '../services';

interface Props {
  pokemons: ISmallPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
  console.log(pokemons);

  return (
    <Layout title='Listado de Pokemons'>
      <ul>
        {pokemons.map(({ id, name }) => (
          <li key={id}>
            #{id} - {name}
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<IPokemonListResponse>(
    '/pokemon?limit=151'
  );
  const urlImg =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/';
  const pokemons: ISmallPokemon[] = data.results.map((pokemon, index) => ({
    ...pokemon,
    id: ++index,
    img: `${urlImg}${++index}.svg`,
  }));

  return {
    props: {
      pokemons,
    },
  };
};

export default HomePage;
