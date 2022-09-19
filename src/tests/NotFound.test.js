import React from 'react';
// import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

it('Teste se a página contém um heading h2 com o texto Page requested not found', () => {
  const { history } = renderWithRouter(<App />);

  const INVALID_URL = '/richard';
  act(() => {
    history.push(INVALID_URL);
  });

  const notFoundTitle = screen.getByRole('heading', {
    name: /page requested not found/i,
    level: 2,
  });

  const notFoundIMG = screen.getByRole('img', {
    name: /pikachu crying because the page requested was not found/i,
  });

  expect(notFoundTitle).toBeInTheDocument();
  expect(notFoundIMG.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
