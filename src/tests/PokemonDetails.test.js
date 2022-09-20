import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';
// import PokemonDetails from '../pages/PokemonDetails';

it('É exibido na tela todos textos com tag h2', () => {
  const { history } = renderWithRouter(<App />);

  const PIKACHU_DETAILS_URL = `/pokemons/${pokemons[0].id}`;
  act(() => {
    history.push(PIKACHU_DETAILS_URL);
  });

  const pokemonDetails = screen.getByRole('heading', {
    name: /pikachu details/i,
    level: 2,
  });

  const summary = screen.getByRole('heading', {
    name: /Summary/i,
    level: 2,
  });

  const gameLocation = screen.getByRole('heading', {
    name: /game locations of pikachu/i,
  });

  const textSummary = screen.getByText(
    /this intelligent pokémon roasts hard berries./i,
  );
  expect(pokemonDetails).toBeInTheDocument();
  expect(summary).toBeInTheDocument();
  expect(textSummary).toBeInTheDocument();
  expect(gameLocation).toBeInTheDocument();
});

it('É exibido na tela uma label com o texto Pokémon favoritado?', () => {
  const { history } = renderWithRouter(<App />);

  const PIKACHU_DETAILS_URL = `/pokemons/${pokemons[0].id}`;
  act(() => {
    history.push(PIKACHU_DETAILS_URL);
  });
  const favoritePokemon = screen.getByText(/pokémon favoritado\?/i);
  expect(favoritePokemon).toBeInTheDocument();
});

it('São exibidas na tela imagens de localização com o src correto', () => {
  const pikachu = pokemons[0];
  const { history } = renderWithRouter(
    <App pokemon={ pikachu } showDetailsLink={ false } isFavorite={ false } />,
  );
  act(() => {
    history.push(`/pokemons/${pikachu.id}`);
  });

  const imageLocation = screen.getAllByRole('img', {
    name: `${pikachu.name} location`,
  });
  expect(imageLocation[1]).toHaveAttribute(
    'src',
    'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
  );
});
