import { TableCell, TableHead, TableRow, Table, TablePagination, TableBody } from "@mui/material";
import { GetPokemonResult, Pokemon } from "../interfaces";
import axios from "axios";
import { useEffect, useState } from "react";
import TableConfig from "./TableConfig";
import { useTheme } from '@mui/material/styles';
import Row from "./TableRow";

interface Props {
  onSelection: (name: string | null) => void;
}
const PokeTable: React.FC<Props> = ({onSelection}) => {  
    const theme = useTheme();
    const rows = 10;

    const columnsFromLocalStorage = localStorage.getItem("columns");
    const initialColumns = columnsFromLocalStorage ? JSON.parse(columnsFromLocalStorage) : [['Id', 'Picture', 'Name', 'Height', 'Weight', 'Types']];

    const [columns, setColumns] = useState<string[]>(initialColumns);

    const [pokemons, setPokemons] = useState<GetPokemonResult>();
    const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
    const [selected, setSelected] = useState<number | null>(null);
    const [page, setPage] = useState<number>(0);

    useEffect(() => {
      localStorage.setItem("columns", JSON.stringify(columns));
    }, [columns]);

    useEffect(() => {
      axios.get<GetPokemonResult>(`https://pokeapi.co/api/v2/pokemon/?offset=${rows*page}&limit=${rows}/`)
        .then(response => setPokemons(response.data))
        .catch(error => console.error(error));
    }, [page]);


    useEffect(() => {
      if (!pokemons) return;

      const promises = pokemons.results.map(pokemon => {
        return axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}/`)
          .then(response => response.data);
      });

      Promise.all(promises)
        .then(data => setPokemonData(data))
        .catch(error => console.error(error));

    }, [pokemons]);

    const onConfig = (col: string) => {
      if (columns.includes(col)) {
        setColumns(columns.filter((c) => c !== col ))
      } else {
        const allCols = ['Id', 'Picture', 'Name', 'Height', 'Weight', 'Types'];
        const updatedCols =  allCols.filter(c => c === col || columns.includes(c));
        setColumns(updatedCols);
      }
    }

    useEffect(() => {
      const handleKeyPress = (event: KeyboardEvent) => {
        if (event.key === 'ArrowUp' && selected && selected !== 0) {
          setSelected(selected - 1);
        } else if (event.key === 'ArrowDown' && selected !== null && selected !== pokemonData.length - 1) {
          setSelected(selected + 1);
        }
      }
      window.addEventListener('keydown', handleKeyPress);
      return () => {
        window.removeEventListener('keydown', handleKeyPress);
      };
    }, [selected, pokemonData.length]);

    useEffect(() => {
      if (selected === null) {
        onSelection(null);
      } else {
        onSelection(pokemonData[selected].name)
      }
    }, [selected, onSelection, pokemonData])

    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
      setSelected(null);
    };

    return (
      <>
        <Table sx={{borderRadius: "10px", backgroundColor: theme.palette.background.paper}}>
          <TableHead sx={{position: 'relative'}}>
            <TableRow >
              {columns.map((column) => (
                <TableCell
                  key={column}
                >
                  {column}
                </TableCell>
              ))}
            </TableRow>
            <TableConfig columns={columns} onConfig={onConfig}/>
          </TableHead>
          <TableBody>
            {pokemonData.map((pokemon, index) => (
              <Row key={pokemon.id} index={index} columns={columns} pokemon={pokemon} onSelect={()=>setSelected(index)} selected={selected===index}/>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[rows]}
          component="div"
          count={pokemons ? pokemons.count : 0}
          rowsPerPage={rows}
          page={page}
          onPageChange={handleChangePage}
        />
      </>
    );
}

export default PokeTable;