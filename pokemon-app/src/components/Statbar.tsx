import { Typography, LinearProgress } from "@mui/material";

interface Props {
  value: number;
}

const Statbar: React.FC<Props> = ({ value }) => {  

   
    const hue = (value/100 * (120 - 0)) + 0;
    const color = 'hsl(' + hue + ', 100%, 50%)';
    const backgroundColor = 'hsl(' + hue + ', 100%, 90%)';
    
    return (
      <>
      
        <LinearProgress
            variant="determinate"
            value={value}
            sx={{
                height: 10,
                borderRadius: 5,
                backgroundColor: backgroundColor,
                "& .MuiLinearProgress-bar": {
                  borderRadius: 5,
                  // Legg til din tilpassede bakgrunnsfarge her
                  backgroundColor: color,
                },
              }}
        />
        <Typography textAlign={'left'}>
              {value}
        </Typography>
      </>

    );
}

export default Statbar;