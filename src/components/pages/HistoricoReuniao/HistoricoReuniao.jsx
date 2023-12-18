import React, { Fragment, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import api from '../../../services/api';
import Cookies from 'js-cookie';

import { ImArrowLeft2 } from 'react-icons/im';
import HeaderBar from '../../layout/header/HeaderBar';
import Container from '../../layout/container/Container';
import SubmitButton from '../../layout/submitbuttun/SubmitButton';
import style from './HistoricoReuniao.module.css';
import AddMeet from '../../Modals/modal_sign_meet/AddMeet';
import ModalDeleteMeet from '../../Modals/modal_delete_meet/ModalDeleteMeet';
// Importe o componente ModalEditMeet aqui, se necessário.

function HistoricoReuniao() {
    const { id } = useParams();
    const [meets, setMeets] = useState([]);

    const location = useLocation();
    const backPage = location.pathname.replace('/historico-de-reunioes', '');
    const userRole = Cookies.get('userType');

    const formatarData = (dt) => {
        const dataObj = new Date(dt);
        const ano = dataObj.getFullYear();
        const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
        const dia = String(dataObj.getDate()).padStart(2, '0');

        return `${dia}/${mes}/${ano}`;
    };

    const handleDownload = async (id, fileName) => {
        try {
            // Certifique-se de que a rota está correta e que o ID é válido.
            const response = await api.get(`/meeting-history/download/${id}`, { responseType: 'blob' });

            // Crie um blob com os dados recebidos e o tipo de conteúdo.
            const blob = new Blob([response.data], { type: response.headers['content-type'] });

            // Crie uma URL para o blob e crie um link para iniciar o download.
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
            document.body.appendChild(link);

            // Inicie o download e limpe a URL criada.
            link.click();
            window.URL.revokeObjectURL(url);

            return response;
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`group/${id}/meeting-history`);
                setMeets(response.data || []); // Certifique-se de tratar uma possível resposta vazia.
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [id]);

    return (
        <Fragment>
            <HeaderBar text="PAINEL DE CONTROLE" backPageIcon={<ImArrowLeft2 size={25} />} backPage={backPage} />
            <div className={style.container}>
                <h2>Histórico de Reuniões</h2>

                {userRole === 'representante' && (
                    <section className={style.section_filter}>
                        <AddMeet data={meets} setData={setMeets} />
                    </section>
                )}

                <h4>FILTROS RÁPIDOS</h4>
                <section className={style.button_filters}>
                    <SubmitButton text="Mais Recentes" customClass="button_filtes_bar" />
                    <SubmitButton text="Mais Antigos" customClass="button_filtes_bar" />
                </section>

                <Container customClass="start">
                    {meets.map((meet) => (
                        <div className={style.cardReuniao} key={meet?.id}>
                            <p className={style.dataReuniao}>{formatarData(meet?.date_meet)}</p>
                            <div className={style.content}>
                                <h2>{meet?.content}</h2>
                                <div>
                                    <ModalDeleteMeet idMeet={meet?.id} data={meets} setData={setMeets} />
                                    {/* <ModalEditMeet idMeet={meet?.id} data={meets} setData={setMeets} /> */}
                                </div>
                            </div>
                            <p className={style.resumoReuniao}>{meet?.summary}</p>
                            <p className={style.link} onClick={() => handleDownload(meet.id, meet.ata)}>
                                {meet?.ata}
                            </p>
                        </div>
                    ))}
                </Container>
            </div>
        </Fragment>
    );
}

export default HistoricoReuniao;
