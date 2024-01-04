import React, { Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../services/api';

import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { TextField } from '@mui/material';
import TextArea from 'antd/es/input/TextArea';

import Modal from '@mui/material/Modal';
import SubmitButton from '../../layout/submitbuttun/SubmitButton';
import style from './modal_edit.module.css';

import { Divider} from 'antd';
import { IconContext } from 'react-icons';
import { IoPencilSharp } from 'react-icons/io5';

const ModalEditMeet = ({ data, setData }) => {
    const [open, setOpen] = useState(false);
    const [formulario, setFormulario] = useState({
        content: '',
        summary: '',
        date_meet: '',
    });
    const [fileList, setFileList] = useState([]);
    const [uploading, setUploading] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { Dragger } = Upload;
    const { id } = useParams();

    const handleUpload = () => {
        const formData = new FormData();

        if (fileList.length === 1) {

            formData.append('ata', fileList[0]);
            formData.append('content', formulario.content);
            formData.append('summary', formulario.summary);
            formData.append('date_meet', formulario.date_meet);

            setUploading(true);

            const response = api.post(`/group/${id}/meeting-history`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(() => {
                    setFileList([]);

                    setFormulario({
                        content: '',
                        summary: '',
                        date_meet: '',
                    });

                    message.success('Reunião criada com sucesso.');
                    setData([...data, response.data]);
                })
                .catch((error) => {
                    console.error('Erro ao criar reunião:', error);
                    message.error('Falha ao criar reunião.');
                })
                .finally(() => {
                    setUploading(false);
                    handleClose();
                });
        } else {
            message.error('Por favor, selecione um único arquivo para enviar.');
        }
    };

    const props = {
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            setFileList([file]);
            return false;
        },
        fileList,
    };

    return (
        <Fragment>
            <IconContext.Provider value={{ color: '#2C74AC', size: 25 }}>
                <button onClick={handleOpen} className={style.button}>
                    <IoPencilSharp />
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
                        <div>
                            <strong>Editar Reunião</strong>
                        </div>
                        <Divider />
                    </nav>
                    <div className={style.container_conteudo}>
                        <TextField
                            type="text"
                            label="Conteúdo"
                            variant="standard"
                            name="content"
                            value={formulario.content}
                            onChange={(e) => setFormulario({ ...formulario, content: e.target.value })}
                            focused
                            margin="normal"
                            sx={{
                                width: '100%',
                            }}
                        />
                        <p className={style.resumo}>Resumo</p>
                        <TextArea
                            placeholder="Digite aqui as observações"
                            value={formulario.summary}
                            rows={2}
                            onChange={(e) => setFormulario({ ...formulario, summary: e.target.value })}
                        />
                        <TextField
                            type="text"
                            label="Data da Reunião"
                            variant="standard"
                            name="date_meet"
                            value={formulario ? formulario.date_meet : ''}
                            onChange={(e) => setFormulario({ ...formulario, date_meet: e.target.value })}
                            focused
                            margin="normal"
                            sx={{
                                width: '100%',
                            }}
                        />
                        <Dragger {...props}>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className={style.upload}>Clique e procure o arquivo que deseja adicionar</p>
                        </Dragger>

                        <section className={style.buttons}>
                            <SubmitButton text="Voltar" customClass="button_back" onClick={handleClose} />
                            <button
                                className={style.salvar}
                                onClick={handleUpload}
                                disabled={fileList.length === 0 || uploading}
                                loading={uploading}
                            >
                                {uploading ? 'Salvando' : 'Salvar'}
                            </button>
                        </section>
                    </div>
                </section>
            </Modal>
        </Fragment>
    );
};

export default ModalEditMeet;
