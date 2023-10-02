import React, { useState } from 'react';
import './App.css';
import PokeTable from './components/PokeTable';
import { Grid, Typography } from '@mui/material';
import PokemonInfo from './components/PokemonInfo';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1e1e1e'
    }
  },
});

function App() {
  const [selected, setSelected] = useState<string | null>();
  const select = (name: string | null) => setSelected(name);

  window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
  }, false);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Typography variant='h3' padding={1}>PokeApp</Typography>
      <Grid container spacing={3} padding={3}>
        <Grid item sm={12} md={6}>
          <PokeTable onSelection={select} />           
        </Grid>
        <Grid item sm={12} md={6}>
          <PokemonInfo name={selected} />          
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
