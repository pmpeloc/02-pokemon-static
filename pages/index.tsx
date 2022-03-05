import { NextPage, GetStaticProps } from 'next';
import { Layout } from '../components/layouts';
import { pokeApi } from '../services';

const HomePage: NextPage = (props) => {
  console.log(props);

  return (
    <Layout title='Listado de Pokemons'>
      <ul>
        <li>Poke</li>
        <li>Poke</li>
        <li>Poke</li>
        <li>Poke</li>
        <li>Poke</li>
        <li>Poke</li>
      </ul>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get('/pokemon?limit=151');

  return {
    props: {
      pokemons: data.results,
    },
  };
};

export default HomePage;
