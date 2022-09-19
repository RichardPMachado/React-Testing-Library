import React from 'react';
import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

it('Na tela aparece No favorite pokemon found, se não tiver pokémons favoritos', () => {
  renderWithRouter(<App />);

  const favorites = screen.getByRole('link', { name: /favorite pokémons/i });

  userEvent.click(favorites);

  const msgNotFound = screen.getByText(/no favorite pokemon found/i);
  expect(msgNotFound).toBeInTheDocument();
});
