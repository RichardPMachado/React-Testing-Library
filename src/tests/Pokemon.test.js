import React from 'react';
import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';
import Pokemon from '../components/Pokemon';

it('Teste se a imagem do pokemon possui o src correto e o alt <name> sprite', () => {
  const pikachu = pokemons[0];
  renderWithRouter(
    <Pokemon pokemon={ pikachu } showDetailsLink={ false } isFavorite={ false } />,
  );

  const image = screen.getByRole('img', {
    name: `${pikachu.name} sprite`,
    src: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  });
  const type = screen.getByText(`${pikachu.type}`);

  expect(image).toHaveAttribute('src', `${pikachu.image}`);
  expect(type).toBeInTheDocument();
});

it('Se star possui o src /star-icon.svg e o alt <name> is marked as favorite', () => {
  const pikachu = pokemons[0];
  renderWithRouter(
    <Pokemon pokemon={ pikachu } showDetailsLink={ false } isFavorite />,
  );
  const imageFavorite = screen.getByRole('img', {
    name: /pikachu is marked as favorite/i,
    src: '/star-icon.svg',
  });

  expect(imageFavorite).toBeInTheDocument();
});

it('É exibido na tela um link com o href /pokemons/<id>', () => {
  const pikachu = pokemons[0];
  renderWithRouter(<App />);
  const link = screen.getByRole('link', { name: /More details/i });
  expect(link).toHaveAttribute('href', `/pokemons/${pikachu.id}`);

  userEvent.click(link);

  const pikachuDetails = screen.getByRole('heading', {
    name: /pikachu details/i,
  });
  expect(pikachuDetails).toBeInTheDocument();
});
