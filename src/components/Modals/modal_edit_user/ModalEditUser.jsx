import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SubmitButton from '../../layout/submitbuttun/SubmitButton';
import api from '../../../services/api';

import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { IconContext } from 'react-icons';
import { TextField } from '@mui/material';
import { IoPencilSharp } from "react-icons/io5";
import styles from './EditUser.module.css'


const EditUser = ({ id, data, setData }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessages, setErrorMessages] = useState({
        email: null,
        password: null,
    });
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            setErrorMessages({
                email: null,
                password: null,
            });

            await api.put(`users/${id}`, { name, email, password })

            const updatedUser = {
                name,
                email,
                password
            }

            setData(data.map(item => (item.id === id ? updatedUser : item)));
            navigate('/users', {
                state: {
                    message: 'Atualizado com sucesso!',
                    messageType: 'success',
                    showMessage: true,
                }
            });
            handleClose();
        } catch (error) {
            const apiErrors = error.response.data.errors;

            setErrorMessages({
                email: apiErrors.email ? apiErrors.email[0] : null,
                password: apiErrors.password ? apiErrors.password[0] : null,
            });

            navigate('/users', { state: { message: 'Ops algo deu errado!', messagetype: 'error' } });
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await api.get(`/users/${id}`);
                setName(data.data.name);
                setEmail(data.data.email);
            } catch (error) {
                console.error(error);
            }
        };

        if (open) {
            fetchData();
        }
    }, [open, id]);

    return (
        <Fragment>
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
                className={styles.edit_user}
            >
                <section>
                    <h4>Editar Usuário</h4>
                    <div>
                        <form className={styles.form} onSubmit={handleSubmit}>
                            <div className={styles.inputField}>
                                <TextField
                                    type='text'
                                    label="Nome"
                                    name='name'
                                    placeholder='Digite um novo nome'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    focused
                                    margin='normal'
                                    sx={{
                                        width: '100%',
                                    }}

                                />
                            </div>
                            <div className={styles.inputField}>
                                <TextField
                                    type='e-mail'
                                    label="E-mail"
                                    name='email'
                                    placeholder='Digite um novo e-mail'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    focused
                                    error={errorMessages.email !== null}
                                    helperText={errorMessages.email}
                                    sx={{
                                        width: '100%',
                                    }}
                                />
                            </div>

                            <div className={styles.inputField}>
                                <TextField
                                    type='password'
                                    label="Senha"
                                    name='password'
                                    placeholder='Digite uma nova senha'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    focused
                                    error={errorMessages.password !== null}
                                    helperText={errorMessages.password}
                                    sx={{
                                        width: '100%',
                                    }}
                                />
                            </div>

                            <div>
                                <SubmitButton text="Voltar" customClass="button_back" onClick={handleClose} />
                                <SubmitButton text="Editar" customClass="button_editar_perfil" />
                            </div>
                        </form>
                    </div >
                </section>
            </Modal>
        </Fragment>
    )
}

export default EditUser;