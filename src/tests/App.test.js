import React from 'react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('Teste se a aplicação é redirecionada para a página inicial', () => {
  const { history } = renderWithRouter(<App />);

  const { pathname } = history.location;
  expect(pathname).toBe('/');

  const home = screen.getByRole('link', { name: /home/i });
  const about = screen.getByRole('link', { name: /about/i });
  const favorite = screen.getByRole('link', { name: /favorite Pokémons/i });

  expect(home).toBeInTheDocument();
  expect(about).toBeInTheDocument();
  expect(favorite).toBeInTheDocument();
});

it('Teste se a aplicação é redirecionada para a página de About', () => {
  const { history } = renderWithRouter(<App />);

  const about = screen.getByRole('link', { name: /About/i });
  userEvent.click(about);

  const { pathname } = history.location;
  expect(pathname).toBe('/about');

  const aboutTitle = screen.getByRole(
    'heading',
    { name: /About/i },
  );

  expect(aboutTitle).toBeInTheDocument();
});

it('Teste se a aplicação é redirecionada para a página de About', () => {
  const { history } = renderWithRouter(<App />);

  const favorite = screen.getByRole('link', { name: /Favorite Pokémons/i });
  userEvent.click(favorite);

  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');

  const favoriteTitle = screen.getByRole(
    'heading',
    { name: /Favorite pokémons/i },
  );

  expect(favoriteTitle).toBeInTheDocument();
});

it('Renderiza o NotFound caso seja acessada uma rota inexistente', () => {
  const { history } = renderWithRouter(<App />);

  const INVALID_URL = '/richard';
  act(() => {
    history.push(INVALID_URL);
  });

  const notFoundTitle = screen.getByRole('heading', {
    name: /page requested not found/i,
    level: 2,
  });

  expect(notFoundTitle).toBeInTheDocument();
});
