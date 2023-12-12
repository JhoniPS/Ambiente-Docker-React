import React, { Fragment, useState } from 'react';

import Modal from '@mui/material/Modal';
import Upload from '../../Upload/Upload'
import TextArea from 'antd/es/input/TextArea';
import SubmitButton from '../../layout/submitbuttun/SubmitButton';
import style from './AddDocumentos.module.css'

import { Divider } from 'antd';
import { IconContext } from 'react-icons';
import { IoMdAdd } from "react-icons/io";
import { TextField } from '@mui/material';

const Filter = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handlSubmit = () => {

    }

    return (
        <Fragment>
            <IconContext.Provider value={{ size: 25 }}>
                <button onClick={handleOpen} className={style.button}>
                    {<IoMdAdd />}<h1>Add Documento</h1>
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
                        <div><span>1</span> <strong>Documentos</strong></div>
                        <Divider />
                    </nav>

                    <div className={style.container_conteudo}>
                        <TextField
                            type='text'
                            label="Nome"
                            variant="standard"
                            name='name'
                            focused
                            margin='normal'
                            sx={{
                                width: '100%',
                            }}
                        />
                        <p>Descrição</p>
                        <TextArea
                            placeholder='Digite aqui as observações'
                            rows={5}
                        />

                        <Upload />

                        <section className={style.buttons}>
                            <SubmitButton
                                text="Voltar"
                                customClass="button_back"
                                onClick={handleClose}
                            />
                            <SubmitButton
                                text="Salvar"
                                customClass="salvar"
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