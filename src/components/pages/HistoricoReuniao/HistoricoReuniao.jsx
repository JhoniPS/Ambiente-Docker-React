import React, { Fragment, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import api from '../../../services/api';
import Cookies from 'js-cookie';

import {
    CButtonGroup,
    CCallout,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCardLink,
    CCardSubtitle,
    CCardText,
} from '@coreui/react';

import Container from '../../layout/container/Container';
import SubmitButton from '../../layout/submitbuttun/SubmitButton';
import style from './HistoricoReuniao.module.css';
import AddMeet from '../../Modals/modal_sign_meet/AddMeet';
import MenuAppBar from '../../layout/AppBar/MenuAppBar';
import ModalDeleteMeet from '../../Modals/modal_delete_meet/ModalDeleteMeet';
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
            const response = await api.get(`/meeting-history/download/${id}`, { responseType: 'blob' });
            const blob = new Blob([response.data], { type: response.headers['content-type'] });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
            document.body.appendChild(link);
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
            <MenuAppBar backStep={backPage} />
            <div className="d-flex flex-column p-4 gap-2 h-100">
                <CCard>
                    <CCardBody>
                        <h2>Histórico de Reuniões</h2>

                        {userRole === 'representante' && (
                            <section className="d-flex align-items-start gap-4">
                                <AddMeet data={meets} setData={setMeets} />
                            </section>
                        )}

                        <h4>FILTROS RÁPIDOS</h4>
                        <section className="d-flex align-items-start gap-2 mb-4">
                            <SubmitButton text="Mais Recentes" customClass="button_filters_bar" onClick={() => setSortOrder('desc')} />
                            <SubmitButton text="Mais Antigos" customClass="button_filters_bar" onClick={() => setSortOrder('asc')} />
                        </section>
                        <CCallout className={'overflow-auto'} style={{ maxHeight: '500px' }}>
                            <Container customClass="start">
                                {meets.length !== 0 ? (
                                    sortDocs().map((meet, index) => (
                                        <CCard key={index} className="p-0" style={{ maxWidth: '24.0rem', width: '100%' }}>
                                            <CCardHeader className="text-lg" style={{ maxWidth: '24.0rem', width: '100%' }} component="h5">{meet?.content}</CCardHeader>
                                            <CCardBody className="d-flex flex-column p-2">
                                                <CCardSubtitle className="mb-2 text-medium-emphasis text-sm">{formatarData(meet?.date_meet)}</CCardSubtitle>
                                                <CCardText className={style.resumoReuniao + ' text-sm'}>{meet?.summary}</CCardText>
                                                <CCardLink onClick={() => handleDownload(meet?.id, meet?.ata)}>{meet?.ata}</CCardLink>
                                            </CCardBody>
                                            <CCardFooter className="d-flex justify-content-end p-0">
                                                <CButtonGroup>
                                                    {<ModalDeleteMeet idMeet={meet?.id} data={meets} setData={setMeets} />}
                                                    {<ModalEditMeet data={meets} setData={setMeets} />}
                                                </CButtonGroup>
                                            </CCardFooter>
                                        </CCard>
                                    ))
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
