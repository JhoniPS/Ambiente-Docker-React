import React, { Fragment, useState } from 'react';
import { Steps, Divider } from 'antd';
import { useParams } from "react-router-dom";
import api from '../../services/api';
import styles from './StepAddMember.module.css';
import FormMember from '../Forms/formMember/FormMember';
import SubmitButton from '../layout/submitbuttun/SubmitButton';
import LinkButton from '../../components/layout/linkbutton/LinkButton'

const StepAddMember = () => {
    const [member, setMember] = useState({
        role: '',
        phone: '',
        entry_data: null,
        departure_date: null,
        user_id: 0,
    });

    const { id } = useParams();
    const [user_id, setUser_id] = useState(0)

    const steps = [
        {
            title: 'Membros',
            content: <FormMember member={member} setMember={setMember} setUser_id={setUser_id} />,
        },
    ];

    const Submit = async (e) => {
        e.preventDefault();

        setMember(prev => ({
            ...prev,
            user_id: user_id.toString(),
        }));

        const updatedFormulario = {
            ...member,
            user_id: user_id.toString(),
        };

        try {
            await api.post(`group/${id}/members`, { updatedFormulario });
        } catch (error) {
            console.error('Erro ao enviar formulário:', error.response.data);
        }
    };

    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
    }));

    return (
        <Fragment>
            <Steps items={items} responsive style={{ justifyContent: 'center' }} />
            <Divider />
            <form className={styles.form}>
                <div className={styles.container_step}>{steps[0].content}</div>

                <div className={styles.button_steps}>
                    <LinkButton text="Voltar" customClass="button_back" to={`/detalhes-de-grupos-representante/${id}/`} />
                    <SubmitButton customClass="add" text="Adicionar" onClick={Submit} />
                </div>
            </form>
        </Fragment>
    );
};

export default StepAddMember;