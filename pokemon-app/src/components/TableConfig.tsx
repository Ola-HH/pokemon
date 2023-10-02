import { Typography, Modal, Box, Grid, Checkbox } from "@mui/material";
import { SettingsOutlined } from '@mui/icons-material';
import { useState } from "react";

interface Props {
    columns: string[];
    onConfig: (col: string) => void;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    textAlign: 'center',
    borderRadius: '10px',
    padding: '25px 5px'
};

const TableConfig: React.FC<Props> = ({ columns, onConfig }) => {  

    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    
    return (
        <>
        <SettingsOutlined onClick={handleOpen} sx={{position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)'}}/>
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h5" component="h2" sx={{marginBottom: '25px'}}>
                    Configurate table columns
                </Typography>
                <Grid container>
                    <Grid item xs={3}>
                        <Typography>
                            Picture
                        </Typography>
                        <Checkbox checked={columns.includes('Picture')} onClick={() => onConfig('Picture')}/>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography>
                            Height
                        </Typography>
                        <Checkbox checked={columns.includes('Height')} onClick={() => onConfig('Height')}/>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography>
                            Weight
                        </Typography>
                        <Checkbox checked={columns.includes('Weight')} onClick={() => onConfig('Weight')}/>
                    </Grid>
                    <Grid item xs={3}> 
                        <Typography>
                            Types
                        </Typography>
                        <Checkbox checked={columns.includes('Types')} onClick={() => onConfig('Types')}/>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
        </>

    );
}

export default TableConfig;