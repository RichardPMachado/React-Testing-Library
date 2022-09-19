import React from 'react';
// import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

it('Teste se a página contém as informações sobre a Pokédex', () => {
  const { history } = renderWithRouter(<App />);

  const ABOUT_URL = '/about';
  act(() => {
    history.push(ABOUT_URL);
  });

  const aboutText = screen.getByText(
    /one can filter pokémons by type, and see more details for each one of them/i,
  );
  expect(aboutText).toBeInTheDocument();
});

it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
  const { history } = renderWithRouter(<App />);

  const INVALID_URL = '/about';
  act(() => {
    history.push(INVALID_URL);
  });

  const aboutHeading = screen.getByRole('heading', {
    name: /About Pokédex/i,
    level: 2,
  });

  expect(aboutHeading).toBeInTheDocument();
});

it('Teste se a página contém dois parágrafos com texto sobre a Pokédex;', () => {
  const { history } = renderWithRouter(<App />);

  const ABOUT_URL = '/about';
  act(() => {
    history.push(ABOUT_URL);
  });

  const aboutText1 = screen.getByText(
    /This application simulates a Pokédex/i,
  );
  expect(aboutText1).toBeInTheDocument();

  const aboutText2 = screen.getByText(
    /one can filter pokémons by type, and see more details for each one of them/i,
  );
  expect(aboutText2).toBeInTheDocument();
});

it('Teste se a página contém a seguinte imagem de uma Pokédex:', () => {
  const { history } = renderWithRouter(<App />);

  const ABOUT_URL = '/about';
  act(() => {
    history.push(ABOUT_URL);
  });

  const aboutIMG = screen.getByRole('img', {
    name: /pokédex/i,
  });
  expect(aboutIMG).toBeInTheDocument();
  expect(aboutIMG.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
