import React, { useState, useEffect } from 'react';
import SubmitButton from '../../layout/submitbuttun/SubmitButton';
import api from '../../../services/api'

import styles from './modal_edit_group.module.css'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { IconContext } from 'react-icons';
import { IoPencilSharp } from "react-icons/io5";

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
    minwidth: '700px',
    minheight: '700px',
    padding: '2.5rem',
    outline: 'none',
    borderRadius: '15px',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
};


export default function ModalEditGroup({ id, data, setData }) {
    const [open, setOpen] = useState(false);

    const [form, setForm] = useState({
        entity: "",
        organ: "",
        council: "",
        internal_concierge: "",
        acronym: "",
        team: "",
        email: "",
        observations: "",
        unit: "",
        office_requested: "",
        office_indicated: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/group/${id}`);
                const groupData = response.data.data;

                setForm({
                    entity: groupData.entity || "",
                    organ: groupData.organ || "",
                    council: groupData.council || "",
                    internal_concierge: groupData.internal_concierge || "",
                    acronym: groupData.acronym || "",
                    team: groupData.team || "",
                    email: groupData.email || "",
                    observations: groupData.observations || "",
                    unit: groupData.unit || "",
                    office_requested: groupData.office_requested || "",
                    office_indicated: groupData.office_indicated || "",
                });
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [id]);


    const handleOpen = (event) => {
        event.stopPropagation();
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    const handlEdit = async (event) => {
        const { name, value } = event.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const Submit = async (event) => {
        event.preventDefault();
        try {
            await api.put(`/group/${id}`, form)

            const updatedData = data.map(item => {
                if (item.id === id) {
                    return { ...item, ...form };
                }
                return item;
            });

            setData(updatedData);
            handleClose();
        } catch (error) {
            console.log(error)
        }
    };

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
                <Box sx={style} onClick={(event) => event.stopPropagation()}>
                    <div>
                        <form className={styles.form} onSubmit={Submit}>
                            <div className={styles.container_form}>
                                <div className={styles.container_text1}>
                                    <TextField
                                        type='text'
                                        label="Entidade"
                                        name='entity'
                                        value={form.entity}
                                        onChange={handlEdit}
                                        focused
                                        margin='normal'
                                        sx={{
                                            width: '100%',
                                        }}
                                    />
                                    <TextField
                                        type='text'
                                        label="Orgão"
                                        name='organ'
                                        value={form.organ}
                                        onChange={handlEdit}
                                        focused
                                        margin='normal'
                                        sx={{
                                            width: '100%',
                                        }}
                                    />
                                    <TextField
                                        type='text'
                                        label="Conselho"
                                        name='council'
                                        value={form.council}
                                        onChange={handlEdit}
                                        focused
                                        margin='normal'
                                        sx={{
                                            width: '100%',
                                        }}
                                    />
                                </div>

                                <div className={styles.container_text2}>
                                    <TextField
                                        type='text'
                                        label="Portaria"
                                        name='internal_concierge'
                                        value={form.internal_concierge}
                                        onChange={handlEdit}
                                        focused
                                        margin='normal'
                                        sx={{
                                            width: '100%',
                                        }}
                                    />
                                    <TextField
                                        type='text'
                                        label="Sigla"
                                        name='acronym'
                                        value={form.acronym}
                                        onChange={handlEdit}
                                        focused
                                        margin='normal'
                                        sx={{
                                            width: '100%',
                                        }}
                                    />
                                    <TextField
                                        type='text'
                                        label="Equipe"
                                        name='team'
                                        value={form.team}
                                        onChange={handlEdit}
                                        focused
                                        margin='normal'
                                        sx={{
                                            width: '100%',
                                        }}
                                    />
                                </div>

                                <div className={styles.container_text3}>
                                    <div>
                                        <TextField
                                            type='text'
                                            label="E-mail"
                                            name='email'
                                            value={form.email}
                                            onChange={handlEdit}
                                            focused
                                            margin='normal'
                                            sx={{
                                                width: '100%',
                                            }}
                                        />
                                        <TextField
                                            type='text'
                                            label="Observações"
                                            name='comments'

                                            value={form.observations}
                                            onChange={handlEdit}
                                            focused
                                            margin='normal'
                                            multiline
                                            rows={4.5}
                                            sx={{
                                                width: '100%',
                                            }}
                                        />
                                    </div>

                                    <div>
                                        <TextField
                                            type='text'
                                            label="Unidade"
                                            name='unit'

                                            value={form.unit}
                                            onChange={handlEdit}
                                            focused
                                            margin='normal'
                                            sx={{
                                                width: '100%',
                                            }}
                                        />
                                        <TextField
                                            type='text'
                                            label="Oficio que solicitou"
                                            name='office_requested'

                                            value={form.office_requested}
                                            onChange={handlEdit}
                                            focused
                                            margin='normal'
                                            sx={{
                                                width: '100%',
                                            }}
                                        />
                                        <TextField
                                            type='text'
                                            label="Oficio que indicou"
                                            name='office_indicated'

                                            value={form.office_indicated}
                                            onChange={handlEdit}
                                            focused
                                            margin='normal'
                                            sx={{
                                                width: '100%',
                                            }}
                                        />
                                    </div>
                                </div>

                            </div>

                            <div className={styles.button}>
                                <SubmitButton text="Voltar" customClass="button_back" onClick={handleClose} />
                                <SubmitButton text="Editar" customClass="button_editar_perfil" />
                            </div>
                        </form>
                    </div >
                </Box>
            </Modal>
        </div >
    );
}
