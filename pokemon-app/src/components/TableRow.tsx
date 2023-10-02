import { TableCell, TableRow, Avatar} from "@mui/material";
import { Pokemon } from "../interfaces";
import { capitalizeFirst } from "../helpFunctions";

interface Props {
  pokemon: Pokemon
  selected: boolean;
  columns: string[];
  index: number;
  onSelect: (index: number) => void;
}

const Row: React.FC<Props> = ({ pokemon, selected, columns, index, onSelect }) => {      
    return (
        <TableRow id={pokemon.name} selected={selected} onClick={() => onSelect(index)}>
            <TableCell>
                {pokemon.id}
            </TableCell>
            {columns.includes('Picture') ? 
                <TableCell>
                    <Avatar alt={pokemon.name} src={pokemon.sprites.front_default} />
                </TableCell>
                : null
            }
            <TableCell>
                {capitalizeFirst(pokemon.name)}
            </TableCell>
            {columns.includes('Height') ? 
                <TableCell>
                    {pokemon.height}
                </TableCell>
                : null
            }
            {columns.includes('Weight') ? 
                <TableCell> 
                    {pokemon.weight}
                </TableCell>
                : null
            }
            {columns.includes('Types') ? 
                <TableCell>
                    {pokemon.types.map((type) => (
                        type.slot < pokemon.types.length ? capitalizeFirst(type.type.name) + ', ' : capitalizeFirst(type.type.name)
                    ))}
                </TableCell>
                : null
            }
      </TableRow>
    );
}

export default Row;