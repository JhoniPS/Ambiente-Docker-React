import React, { Fragment, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import api from '../../../services/api';
import Cookies from 'js-cookie';

import Container from '../../layout/container/Container';
import SubmitButton from '../../layout/submitbuttun/SubmitButton';
import style from './HistoricoReuniao.module.css';
import AddMeet from '../../Modals/modal_sign_meet/AddMeet';
import MenuAppBar from '../../layout/AppBar/MenuAppBar';
import ModalDeleteMeet from '../../Modals/modal_delete_meet/ModalDeleteMeet';
import { CButtonGroup, CCallout, CCard, CCardBody, CCardLink, CCardSubtitle, CCardText, CCardTitle } from '@coreui/react';
import ModalEditMeet from '../../Modals/modal_edit_meet/ModalEditMeet';

function HistoricoReuniao() {
    const { id } = useParams();
    const [meets, setMeets] = useState([]);
    const [sortOrder, setSortOrder] = useState('desc');

    const location = useLocation();
    const backPage = location.pathname.replace('/historico-de-reunioes', '');
    const userRole = Cookies.get('userType');

    const sortDocs = () => {
        return [...meets].sort((a, b) => {
            if (sortOrder === 'desc') {
                return new Date(b.created_at) - new Date(a.created_at);
            } else {
                return new Date(a.created_at) - new Date(b.created_at);
            }
        });
    };

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
                setMeets(response.data || []);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [id]);

    return (
        <Fragment>
            <MenuAppBar />
            <div className="d-flex flex-column p-4 gap-2 h-100">
                <CCard>
                    <CCardBody>
                        <h2>Histórico de Reuniões</h2>

                        {userRole === 'representante' && (
                            <section className={style.section_filter}>
                                <AddMeet data={meets} setData={setMeets} />
                            </section>
                        )}

                        <h4>FILTROS RÁPIDOS</h4>
                        <section className={style.button_filters}>
                            <SubmitButton
                                text="Mais Recentes"
                                customClass="button_filtes_bar"
                                onClick={() => setSortOrder('desc')}
                            />
                            <SubmitButton
                                text="Mais Antigos"
                                customClass="button_filtes_bar"
                                onClick={() => setSortOrder('asc')}
                            />
                        </section>
                        <CCallout>
                            <Container customClass="start">
                                {meets.length !== 0 ? (
                                    <Container customClass="start">
                                        {sortDocs().map((meet, index) => (
                                            <CCard className='d-flex flex-column' style={{ height: '200 px', width: '400px' }} key={index}>
                                                <CCardBody className='d-flex flex-column'>
                                                    <CCardTitle>{meet?.content}</CCardTitle>
                                                    <CCardSubtitle className="mb-2 text-medium-emphasis">{formatarData(meet?.date_meet)}</CCardSubtitle>
                                                    <CCardText className={style.resumoReuniao}>
                                                        {meet?.summary}
                                                    </CCardText>
                                                    <CCardLink onClick={() => handleDownload(meet?.id, meet?.ata)}>{meet?.ata}</CCardLink>
                                                    <CButtonGroup className='d-flex gap-3 md-3'>
                                                        {<ModalDeleteMeet idMeet={meet?.id} data={meets} setData={setMeets} />}
                                                        {<ModalEditMeet />}
                                                    </CButtonGroup>
                                                </CCardBody>
                                            </CCard>
                                        ))}
                                    </Container>
                                ) : (
                                    <p>Sem notas</p>
                                )}
                            </Container>
                        </CCallout>
                    </CCardBody>
                </CCard>
            </div>
        </Fragment>
    );
}

export default HistoricoReuniao;
