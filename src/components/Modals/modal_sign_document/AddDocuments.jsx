import React, { Fragment, useState } from 'react';

import Modal from '@mui/material/Modal';
import Upload from '../../Upload/Upload'
import SubmitButton from '../../layout/submitbuttun/SubmitButton';
import style from './AddDocumentos.module.css'

import { Divider } from 'antd';
import { IconContext } from 'react-icons';
import { IoMdAdd } from "react-icons/io";

const AddDocuments = ({data, setData}) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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

                        <Upload data={data} setData={setData}/>

                        <section className={style.buttons}>
                            <SubmitButton
                                text="Voltar"
                                customClass="button_back"
                                onClick={handleClose}
                            />
                        </section>
                    </div>
                </section>
            </Modal>
        </Fragment>
    )
}

export default AddDocuments;