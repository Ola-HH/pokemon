import React from 'react';
import { render, screen } from '@testing-library/react';
import PokemonInfo from '../components/PokemonInfo';

jest.mock('axios');

describe('PokemonInfo Component', () => {
  it('Displays "Click on a Pokemon in the table" message when name is falsy', () => {

    render(<PokemonInfo name={null} />);

    expect(
      screen.getByText('Click on a Pokemon in the table for detailed stat view!')
    ).toBeInTheDocument();
  
  });

  it('Displays detailed information when name is truthy', async () => {
    const mockPokemonData = {
      name: 'Pikachu',
      sprites: {
        front_default: 'img_url',
      },
      stats: [
        {
          base_stat: 60,
          stat: {
            name: 'hp'
          }
        },
        {
          base_stat: 47,
          stat: {
            name: 'attack'
          }
        },
      ]
    };

    const axios = require('axios');

    axios.get.mockResolvedValueOnce({ data: mockPokemonData });

    render(<PokemonInfo name="Pikachu" />);

    await screen.findByText('Pikachu');

    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByText('Hp')).toBeInTheDocument();
  });
});
