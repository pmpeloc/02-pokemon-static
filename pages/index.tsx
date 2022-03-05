import { NextPage, GetStaticProps } from 'next';
import { Card, Grid, Row, Text } from '@nextui-org/react';

import { Layout } from '../components/layouts';
import { IPokemonListResponse, ISmallPokemon } from '../interfaces';
import { pokeApi } from '../services';

interface Props {
  pokemons: ISmallPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
  return (
    <Layout title='Listado de Pokemons'>
      <Grid.Container gap={2} justify='flex-start'>
        {pokemons.map(({ id, name, img }) => (
          <Grid xs={6} sm={3} md={2} xl={1} key={id}>
            <Card hoverable clickable>
              <Card.Body css={{ p: 1 }}>
                <Card.Image src={img} width='100%' height={140} />
              </Card.Body>
              <Card.Footer>
                <Row justify='space-between'>
                  <Text transform='capitalize'>{name}</Text>
                  <Text>#{id}</Text>
                </Row>
              </Card.Footer>
            </Card>
          </Grid>
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
