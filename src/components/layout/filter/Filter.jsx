import React, { Fragment, useState } from 'react';
import { DatePicker, Select } from 'antd';

import Modal from '@mui/material/Modal';
import SubmitButton from '../submitbuttun/SubmitButton';
import { IconContext } from 'react-icons';
import { HiXMark } from "react-icons/hi2";
import { IoIosFunnel } from "react-icons/io";
import style from './filter.module.css'

const Filter = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handlSubmit = () => {

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
                        <p>Representante</p>
                        <div>
                            <Select
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
                                Unidade
                                <Select
                                    placeholder='Selecione uma unidade'
                                    size='large'
                                    type='text'
                                    style={{
                                        width: '100%',
                                        height: '70px',
                                    }}
                                />
                            </div>

                            <div>
                                Conselho
                                <Select
                                    placeholder='Selecione um conselho'
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
                                value="Limpar_filtro"
                                onClick={handlSubmit}
                            />
                            <SubmitButton
                                text="APLICAR FILTRO"
                                customClass="aplicar_filter"
                                value="Aplicar_Filtro"
                                onClick={handlSubmit}
                            />
                        </section>
                    </div>
                </section>
            </Modal>
        </Fragment>
    )
}

export default Filter;