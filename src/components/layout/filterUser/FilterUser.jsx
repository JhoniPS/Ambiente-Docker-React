import React, { Fragment, useState } from 'react';
import { DatePicker, Select, Input } from 'antd';

import Modal from '@mui/material/Modal';
import SubmitButton from '../submitbuttun/SubmitButton';
import { IconContext } from 'react-icons';
import { HiXMark } from "react-icons/hi2";
import { IoIosFunnel } from "react-icons/io";
import style from './filter.module.css'
import api from '../../../services/api';

const FilterUser = ({ setData }) => {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState("");

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handlSubmit = async (e) => {
        e.preventDefault();
        await api.get(`users?email=${email}`).then((response) => {
            setData(response.data.data);
            handleClose();
        })
    }

    const resetState = () => {
        setEmail("");
    }

    return (
        <Fragment>
            <IconContext.Provider value={{ size: 25 }}>
                <button onClick={handleOpen} className={style.button_filter}>
                    {<IoIosFunnel />}Filtro
                </button>
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
                        <h1>Filtrar</h1>
                        <IconContext.Provider value={{ size: 30 }}>
                            <HiXMark onClick={handleClose} />
                        </IconContext.Provider>
                    </nav>

                    <div className={style.container_conteudo}>
                        <p>Data de Criação</p>
                        <div className={style.data}>
                            <DatePicker
                                size='large'
                                placeholder='Selecione uma data'
                                style={{
                                    width: '100%',
                                    height: '70px',
                                    zIndex: 1,
                                }}
                            />
                            <DatePicker
                                size='large'
                                placeholder='Selecione uma data'
                                style={{
                                    width: '100%',
                                    height: '70px',
                                    zIndex: 1,
                                }}
                            />
                        </div>

                        <p>Usuário</p>
                        <div>
                            <Input
                                placeholder='Selecione um representante'
                                size='large'
                                type='text'
                                style={{
                                    width: '100%',
                                    height: '70px',
                                }}
                            />
                        </div>

                        <div className={style.select}>
                            <div>
                                Email
                                <Input
                                    placeholder='Selecione o email'
                                    size='large'
                                    type='text'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    style={{
                                        width: '100%',
                                        height: '70px',
                                    }}
                                />
                            </div>

                            <div>
                                Tipo de usuário
                                <Select
                                    placeholder='Selecione o tipo de usuário'
                                    size='large'
                                    type='text'
                                    style={{
                                        width: '100%',
                                        height: '70px',
                                    }}
                                />
                            </div>
                        </div>

                        <section className={style.buttons}>
                            <SubmitButton
                                text="Limpar filtro"
                                customClass="button_filter"
                                onClick={resetState}
                            />
                            <SubmitButton
                                text="APLICAR FILTRO"
                                customClass="aplicar_filter"
                                onClick={handlSubmit}
                            />
                        </section>
                    </div>
                </section>
            </Modal>
        </Fragment>
    )
}

export default FilterUser;