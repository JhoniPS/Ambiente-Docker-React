import * as React from 'react';
import FormEditTypeUser from '../../Forms/formEditTypeUser/FormEditTypeUser'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { IconContext } from 'react-icons';
import { IoPencilSharp } from "react-icons/io5";
import { Typography } from '@mui/material';

const style = {
    display: 'flex',
    flexDirection: 'column',
    transform: 'translate(80%, 30%)',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'justify',
    gap: '20px',
    backgroundColor: '#FFF',
    width: '500px',
    height: '400px',
    padding: '2rem',
    outline: 'none',
    borderRadius: '3px',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
};

const styleTitle = {
    color: '#2C74AC',
    textAlign: 'center',
    fontFeatureSettings: "'clig' off, 'liga' off",
    fontFamily: 'Roboto',
    fontSize: '30px',
    fontStyle: 'normal',
    padding: '20px',
    fontWeight: 500,
    lineHeight: '36px',
};


export default function EditTypeUser() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <IconContext.Provider value={{ color: "#2C74AC", size: 20 }}>
                <Button onClick={handleOpen}>
                    <IoPencilSharp />
                </Button>
            </IconContext.Provider>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography sx={styleTitle}>Editar tipo de usuário</Typography>
                    <FormEditTypeUser />
                </Box>
            </Modal>
        </div>
    );
}
