import React, { Fragment, useEffect, useState } from 'react';
import MenuAppBar from '../../layout/AppBar/MenuAppBar';
import useAuthContext from '../../contexts/Auth';
import api from '../../../services/api';
import {
    CButton,
    CCard,
    CCardBody,
    CCollapse,
    CContainer,
    CFormCheck,
    CRow
} from '@coreui/react';

import { AiTwotoneDelete } from "react-icons/ai";
import { useLocation, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import EditActivity from '../../Modals/modal_edit_activity/EditActivity';
import Message from '../../layout/Message/Message';
import AddActivity from '../../Modals/modal_sign_activity/AddActivity';

function Activity() {
    const { id } = useParams();
    const [activitys, setActivitys] = useState([]);
    const [openCards, setOpenCards] = useState([]);

    const { message, messageType, showMessage, setShowMessage } = useAuthContext();

    const location = useLocation();
    const backPage = location.pathname.replace("/atividades", '');
    const userRole = Cookies.get('userType');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`groups/${id}/activity`);
                setActivitys(response.data);
                setOpenCards(new Array(response.data.length).fill(false));
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [id]);

    const toggleCard = (index) => {
        const updatedOpenCards = [...openCards];
        updatedOpenCards[index] = !updatedOpenCards[index];
        setOpenCards(updatedOpenCards);
    };

    const taskComplete = async (idTask) => {
        try {
            await api.put(`groups/${id}/activity/${idTask}/complete`);
        } catch (error) {
            console.log(error);
        }
    };

    const taskRestore = async (idTask) => {
        try {
            const response = await api.put(`groups/${id}/activity/${idTask}/restore`);
            const updatedTaskList = activitys.map((item) => {
                if (item.id === idTask) {
                    return response.data;
                }
                return item;
            });

            setActivitys(updatedTaskList);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteTask = async (activityId) => {
        try {
            await api.delete(`groups/${id}/activity/${activityId}`);
            const updateTaskList = activitys.filter(item => item.id !== activityId);
            setActivitys(updateTaskList);
        } catch (error) {
            console.log(error);
        }
    };

    const verificationTask = async (taskId, done_at) => {
        try {
            if (done_at) {
                await taskRestore(taskId);
            } else {
                await taskComplete(taskId);
            }

            const updatedTaskList = activitys.map((item) => {
                if (item.id === taskId) {
                    return { ...item, done_at: done_at ? null : new Date().toISOString() };
                }
                return item;
            });

            setActivitys(updatedTaskList);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Fragment>
            <MenuAppBar backStep={backPage} />
            <div className="d-flex flex-column p-4 gap-2 h-100">
                <div className='d-flex w-100 justify-content-between'>
                    <h2 className='mb-0'>Lista de Atividades</h2>

                    {userRole === 'representante' && (
                        <AddActivity activitys={activitys} setActivitys={setActivitys} />
                    )}
                </div>

                <CCard className='container-fluid overflow-auto' style={{ maxHeight: '80vh', minHeight: 'auto' }}>
                    <CCardBody className='p-0 mt-3 mb-3'>
                        <CContainer fluid>
                            <CRow className="d-flex p-0 flex-wrap gap-3">
                                {activitys.length !== 0 ? (
                                    activitys.map((activity, index) => (
                                        <CCard key={index} onClick={() => toggleCard(index)} className='rounded-0'>
                                            <CCardBody className={`d-flex justify-content-between align-items-center p-1 text-wrap ${activity.done_at ? 'text-decoration-line-through' : ''}`}>
                                                <p className='mb-0 fw-bold'>{activity?.name}</p>
                                                <p className='mb-0 fst-italic'>Data de Início: {activity.start_date}</p>
                                                <p className='mb-0 fst-italic'>Data de Fim: {activity.end_date}</p>
                                                {userRole === 'representante' && (
                                                    <div className='gap-3  d-flex justify-content-center align-items-center'>
                                                        <CFormCheck
                                                            checked={activity.done_at}
                                                            onClick={(e) => { e.stopPropagation(); verificationTask(activity.id, activity.done_at) }}
                                                        />
                                                        <EditActivity idActivity={activity.id} data={activitys} setData={setActivitys} />
                                                        <CButton color='transparent' style={{ cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); deleteTask(activity?.id) }}>
                                                            <AiTwotoneDelete size={20} color='red' />
                                                        </CButton>
                                                    </div>
                                                )}
                                            </CCardBody>
                                            <CCollapse visible={openCards[index]} className='mb-3'>
                                                <CCard className="mt-3 rounded-0 border-0">
                                                    <CCardBody className='d-flex justify-content-between align-items-center justify-content-center p-1 text-wrap text-break'>
                                                        {activity?.description}
                                                    </CCardBody>
                                                </CCard>
                                            </CCollapse>
                                        </CCard>
                                    ))
                                ) : null}
                            </CRow>
                        </CContainer>
                    </CCardBody>
                </CCard>
                {showMessage && <Message type={messageType} msg={message} setShowMessage={setShowMessage} />}
            </div>
        </Fragment>
    );
}

export default Activity;
