import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import SubmitButton from '../../layout/submitbuttun/SubmitButton';
import styles from './ModalEditMember.module.css';
import { IconContext } from 'react-icons';
import { IoPencilSharp } from 'react-icons/io5';
import { Typography, TextField } from '@mui/material';

const style = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'justify',
    gap: '2em',
    backgroundColor: '#FFF',
    minWidth: '500px',
    minHeight: '400px',
    padding: '2.5rem',
    outline: 'none',
    borderRadius: '15px',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
};

const styleTitle = {
    color: '#2C74AC',
    textAlign: 'center',
    fontFeatureSettings: "'clig' off, 'liga' off",
    fontFamily: 'Roboto',
    fontSize: '30px',
    fontStyle: 'normal',
    padding: '2px',
    fontWeight: 500,
    lineHeight: '36px',
};

export default function ModalEditMember({ memberId, data, setData }) {
    const [open, setOpen] = useState(false);
    const [member, setMember] = useState({
        role: '',
        phone: '',
        entry_date: '',
        departure_date: '',
        created_at: '',
        updated_at: '',
        user: {
            id: '',
            name: '',
            email: '',
            type_user: ''
        }
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handlEdit = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/members/${memberId}`, member);

            const updatedData = data.map((item) =>
                item.id === memberId ? member : item
            );

            setData(updatedData);
            handleClose();
        } catch (error) {
            console.error('Erro ao editar membro:', error);
        }
    };

    useEffect(() => {
        const fetchMember = async () => {
            try {
                const response = await api.get(`members/${memberId}`);
                const memberData = response.data.data;

                if (memberData) {
                    setMember({
                        id: memberData.id,
                        role: memberData.role || '',
                        phone: memberData.phone || '',
                        entry_date: memberData.entry_date || '',
                        departure_date: memberData.departure_date || '',
                        created_at: memberData.created_at || '',
                        updated_at: memberData.updated_at || '',
                        user: {
                            id: memberData.user.id,
                            name: memberData.user.name || '',
                            email: memberData.user.email || '',
                            type_user: memberData.user.type_user || ''
                        }
                    });
                } else {
                    console.error('Dados de membro não encontrados');
                }
            } catch (error) {
                console.error('Erro ao buscar membro:', error);
            }
        };

        fetchMember();

    }, [memberId]);

    return (
        <div>
            <IconContext.Provider value={{ color: '#2C74AC', size: 20 }}>
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
                    <Typography sx={styleTitle}>Editar membro do grupo</Typography>
                    <div>
                        <form className={styles.Form} onSubmit={handlEdit}>
                            <TextField
                                type="text"
                                label="Função"
                                name="role"
                                value={member.role}
                                onChange={(e) => setMember({ ...member, role: e.target.value })}
                                focused
                                margin="normal"
                                sx={{
                                    width: 350,
                                }}
                            />
                            <TextField
                                type="text"
                                label="Telefone"
                                name="phone"
                                value={member.phone}
                                onChange={(e) => setMember({ ...member, phone: e.target.value })}
                                focused
                                margin="normal"
                                sx={{
                                    width: 350,
                                }}
                            />

                            <div>
                                <SubmitButton text="Voltar" customClass="button_back" onClick={handleClose} />
                                <SubmitButton text="Editar" customClass="button_editar_perfil" />
                            </div>
                        </form>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
