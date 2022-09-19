import React from 'react';
import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

it('Teste se a página contém um heading h2 com o texto Encountered pokémons', () => {
  const { history } = renderWithRouter(<App />);

  const { pathname } = history.location;
  expect(pathname).toBe('/');

  const titleH2 = screen.getByRole('heading', {
    name: /Encountered pokémons/i,
    level: 2,
  });

  expect(titleH2).toBeInTheDocument();
});

it('Teste se é exibido o próximo pokémon da lista quando o botão é clicado', () => {
  renderWithRouter(<App />);

  const proxPokemon = screen.getByRole('button', {
    name: /próximo pokémon/i,
  });
  expect(proxPokemon).toBeInTheDocument();

  pokemons.forEach((e) => {
    const namePokemon = screen.getByText(e.name);
    expect(namePokemon).toBeInTheDocument();
    userEvent.click(proxPokemon);
  });

  const pikachu = screen.getByText(/pikachu/i);
  expect(pikachu).toBeInTheDocument();
});

it('Teste se a Pokédex tem os botões de filtro:', () => {
  renderWithRouter(<App />);
  const allButtonsLength = 7;
  const dragon = screen.getByRole('button', { name: /dragon/i });
  const normal = screen.getByRole('button', { name: /normal/i });
  const psychic = screen.getByRole('button', { name: /psychic/i });
  const poison = screen.getByRole('button', { name: /poison/i });
  const bug = screen.getByRole('button', { name: /bug/i });
  const fire = screen.getByRole('button', { name: /fire/i });
  const electric = screen.getByRole('button', { name: /electric/i });

  expect(dragon
    && normal
    && psychic
    && poison
    && bug
    && fire
    && electric).toBeInTheDocument();

  const buttons = screen.getAllByTestId(/pokemon-type-button/i);
  expect(buttons.length).toBe(allButtonsLength);

  const all = screen.getByRole('button', { name: /all/i });
  expect(all).toBeInTheDocument();
  userEvent.click(all);
});
