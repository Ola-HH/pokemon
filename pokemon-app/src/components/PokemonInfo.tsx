import { Card, Typography, Stack, Grid, Box } from "@mui/material";
import { Pokemon } from "../interfaces";
import axios from "axios";
import { useEffect, useState } from "react";
import Statbar from "./Statbar";
import { capitalizeFirst } from "../helpFunctions";

interface Props {
  name?: string | null;
}

const PokemonInfo: React.FC<Props> = ({ name }) => {  
    const [pokemon, setPokemon] = useState<Pokemon | null>();

    useEffect(() => {
      if (!name) return setPokemon(null);
      axios.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${name}/`)
        .then(response => setPokemon(response.data))
        .catch(error => console.error(error));
    }, [name]);

    return (
      <>
        {!pokemon ? 
        <Typography variant="h5">
          Click on a Pokemon in the table for detailed stat view!
        </Typography>
        : 
          <Card sx={{padding: 2}}>
              <Typography variant="h4" fontWeight={600}>{capitalizeFirst(pokemon.name)}</Typography>
              <Grid container>
                <Grid item xs={6}>
                  <Typography fontWeight={'bold'}>Detailed stats</Typography>
                  <Stack spacing={2}>        
                    {
                      pokemon.stats.map((stat) => (
                        <Box key={stat.stat.name}>
                          <Typography textAlign={'left'} fontWeight={700}>{capitalizeFirst(stat.stat.name)}</Typography>
                          <Statbar value={stat.base_stat} />
                        </Box>
                      ))
                    }
                </Stack>
                </Grid>
                <Grid item xs={6} height={'100%'}>
                  <img width="100%" alt={pokemon.name} src={pokemon.sprites.front_default}/>
                </Grid>
              </Grid>
              
          </Card>
        }
      </>

    );
}

export default PokemonInfo;