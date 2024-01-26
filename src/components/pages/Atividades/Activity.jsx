import React, { Fragment, useEffect, useState } from 'react';
import MenuAppBar from '../../layout/AppBar/MenuAppBar';
import api from '../../../services/api';
import {
    CButton,
    CCard,
    CCardBody,
    CCollapse,
    CContainer,
    CForm,
    CFormCheck,
    CFormInput,
    CFormTextarea,
    CInputGroup,
    CInputGroupText,
    CRow
} from '@coreui/react';
import CIcon from '@coreui/icons-react';

import { AiTwotoneDelete } from "react-icons/ai";
import { cilBook, cilCalendar, cilColorBorder } from '@coreui/icons';

import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import EditActivity from '../../Modals/modal_edit_activity/EditActivity';

function Activity() {
    const { id } = useParams();
    const [activitys, setActivitys] = useState([]);
    const [activity, setActivity] = useState({
        name: '',
        description: '',
        start_date: '',
        end_date: '',
    });
    const [openCards, setOpenCards] = useState([]);

    const userRole = Cookies.get('userType');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`group/${id}/activity`);
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

    const submit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post(`group/${id}/activity`, activity);
            setActivitys([...activitys, response.data]);
            setActivity({
                name: '',
                description: '',
                start_date: '',
                end_date: '',
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = (event) => {
        const { name, value } = event.target;

        setActivity({
            ...activity,
            [name]: value,
        });
    };

    const taskComplete = async (idTask) => {
        try {
            await api.put(`activity/complete/${idTask}`);
        } catch (error) {
            console.log(error);
        }
    };

    const taskRestore = async (idTask) => {
        try {
            const response = await api.put(`activity/restore/${idTask}`);
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
            await api.delete(`group/${id}/activity/${activityId}`);
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
            <MenuAppBar />
            <div className="d-flex flex-column p-4 gap-2 h-100">
                {userRole === 'representante' && (
                    <>
                        <h2>Cadastrar Atividade</h2>
                        <CCard className='container-fluid'>
                            <CCardBody>
                                <CForm onSubmit={submit}>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>
                                            <CIcon icon={cilBook} />
                                        </CInputGroupText>

                                        <CFormInput
                                            type='text'
                                            name='name'
                                            value={activity.name}
                                            onChange={handleEdit}
                                            autoComplete="On"
                                            placeholder='Nome da Atividade'
                                        />
                                    </CInputGroup>

                                    <CInputGroup className='mb-3'>
                                        <CInputGroupText>
                                            <CIcon icon={cilColorBorder} />
                                        </CInputGroupText>
                                        <CFormTextarea
                                            placeholder='Descrição da Atividade'
                                            name='description'
                                            value={activity.description}
                                            onChange={handleEdit}
                                        />
                                    </CInputGroup>

                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>
                                            <CIcon icon={cilCalendar} />
                                        </CInputGroupText>

                                        <CFormInput
                                            type='date'
                                            name='start_date'
                                            value={activity.start_date}
                                            onChange={handleEdit}
                                        />

                                        <CFormInput
                                            type='date'
                                            name='end_date'
                                            value={activity.end_date}
                                            onChange={handleEdit}
                                        />
                                        <CInputGroupText>
                                            <CIcon icon={cilCalendar} />
                                        </CInputGroupText>
                                    </CInputGroup>

                                    <CButton className='w-100' type='submit'>
                                        Nova Atividade
                                    </CButton>
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </>
                )}

                <h2>Lista de Atividades</h2>
                <CCard className='container-fluid overflow-auto' style={{ maxHeight: '80vh', minHeight: '50vh' }}>
                    <CCardBody className='p-0 mt-3 mb-3'>
                        <CContainer fluid>
                            <CRow className="d-flex p-0 flex-wrap gap-3">
                                {activitys.length !== 0 ? (
                                    activitys.map((activity, index) => (
                                        <CCard key={index} onClick={() => toggleCard(index)} className='rounded-0'>
                                            <CCardBody className={`d-flex justify-content-between align-items-center justify-content-center p-1 text-wrap fw-bold ${activity.done_at ? 'text-decoration-line-through' : ''}`}>
                                                {activity?.name}
                                                {userRole === 'representante' && (
                                                    <div className='gap-3  d-flex justify-content-center align-items-center'>
                                                        <CFormCheck
                                                            checked={activity.done_at}
                                                            onClick={(e) => { e.stopPropagation(); verificationTask(activity.id, activity.done_at) }}
                                                        />
                                                        <EditActivity id={activity.id} data={activitys} setData={setActivitys} />
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
            </div>
        </Fragment>
    );
}

export default Activity;
