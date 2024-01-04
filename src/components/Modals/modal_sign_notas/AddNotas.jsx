import React, { Fragment, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../../services/api'

import Modal from '@mui/material/Modal';
import SubmitButton from '../../layout/submitbuttun/SubmitButton';
import TextArea from 'antd/es/input/TextArea';

import style from './AddNotas.module.css';

import { Divider } from 'antd';
import { IconContext } from 'react-icons';
import { IoMdAdd } from 'react-icons/io';
import { TextField } from '@mui/material';
import { CButton } from '@coreui/react';


const AddNotas = ({ data, setData }) => {
    const [open, setOpen] = useState(false);
    const [nota, setNota] = useState({
        title: '',
        description: '',
        color: '',
    })

    const navigate = useNavigate();
    const { id } = useParams();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleColorButtonClick = (color) => {
        setNota({ ...nota, color: color });
    };

    const handleEdit = (event) => {
        const { name, value } = event.target;
        setNota({
            ...nota,
            [name]: value,
        });
    };

    const submit = async () => {
        try {
            const response = await api.post(`group/${id}/notes`, nota)
            setData([...data, response.data]);
            navigate(`/detalhes-de-grupos-representante/${id}/notas`, {
                state: {
                    message: 'Atualizado com sucesso!',
                    messageType: 'success',
                    showMessage: true,
                }
            });
            handleClose();
        } catch (error) {
            navigate(`/detalhes-de-grupos-representante/${id}/notas`, {
                state: {
                    message: `Ops! algo deu errado ${error.response.data.errors}`,
                    messageType: 'error',
                    showMessage: true,
                }
            });
        }
    }

    return (
        <Fragment>
            <IconContext.Provider value={{ size: 22 }}>
                <CButton onClick={handleOpen} className="mb-3" color="primary">
                    <IoMdAdd /> Adicionar Notas
                </CButton>
            </IconContext.Provider>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{
                    zIndex: 2,
                }}
            >
                <section className={style.container_modal}>
                    <nav className={style.header}>
                        <div>
                            <span>1</span> <strong>Nota</strong>
                        </div>
                        <Divider />
                    </nav>
                    <div className={style.container_conteudo}>
                        <TextField
                            type="text"
                            label="Titulo"
                            variant="standard"
                            name="title"
                            focused
                            value={nota.title}
                            onChange={handleEdit}
                            margin="normal"
                            sx={{
                                width: '100%',
                            }}
                        />

                        <p>Descrição</p>

                        <TextArea
                            placeholder="Insira aqui sua nota"
                            value={nota.description}
                            name='description'
                            onChange={handleEdit}
                            rows={5}
                        />

                        <p>Cor</p>
                        <div className={style.container_button_color}>
                            <button
                                className={`${style.button_color} ${style.green}`}
                                onClick={() => handleColorButtonClick('green')}
                            ></button>
                            <button
                                className={`${style.button_color} ${style.yellow}`}
                                onClick={() => handleColorButtonClick('yellow')}
                            ></button>
                            <button
                                className={`${style.button_color} ${style.blue}`}
                                onClick={() => handleColorButtonClick('blue')}
                            ></button>
                            <button
                                className={`${style.button_color} ${style.red}`}
                                onClick={() => handleColorButtonClick('red')}
                            ></button>
                        </div>

                        <section className={style.buttons}>
                            <SubmitButton
                                text="Voltar"
                                customClass="button_back"
                                onClick={handleClose}
                            />

                            <SubmitButton
                                text="Salvar"
                                customClass="salvar"
                                onClick={submit}
                            />
                        </section>
                    </div>
                </section>
            </Modal>
        </Fragment>
    );
};

export default AddNotas;
