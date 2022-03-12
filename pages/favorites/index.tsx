import { useEffect, useState } from 'react';
import { NextPage } from 'next';

import { Layout } from '../../components/layouts';
import { NoFavorites } from '../../components/ui';
import { localFavorites } from '../../utils';

const FavoritesPage: NextPage = () => {
  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]);

  useEffect(() => {
    setFavoritePokemons(localFavorites.pokemons);
  }, []);

  return (
    <Layout title='Favoritos'>
      <NoFavorites />
    </Layout>
  );
};

export default FavoritesPage;
