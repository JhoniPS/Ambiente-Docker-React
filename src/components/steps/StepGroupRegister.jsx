import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

import { Button, Steps, Divider, Radio } from 'antd';
import { TextField } from '@mui/material';
import FormSignGroup from '../Forms/formSignGroup/FormSignGroup';
import styles from './StepGroupRegister.module.css';
import TextArea from 'antd/es/input/TextArea';

const RepresentanteGroup = ({representative,  setRepresentative }) => {

    const handleChange = (e) => {
        setRepresentative(e.target.value);
    };

    return (
        <section className={styles.representantes}>
            <TextField
                type='text'
                label="E-mail do representante"
                variant="standard"
                name='representative'
                value={representative}
                onChange={handleChange}
                focused
                margin='normal'
                sx={{
                    width: '100%',
                }}
            />
        </section>
    );
};

const Observations = ({ observations, setObservations, name, setName, type_group, setType_group }) => {

    const handleObservations = (e) => {
        setObservations(e.target.value)
    }

    const handleChange = (e) => {
        setName(e.target.value);
    };

    const handleRadioChange = (e) => {
        setType_group(e.target.value);
    };

    return (
        <section className={styles.observacoes}>
            <TextField
                type='text'
                label="Nome do Grupo"
                variant="standard"
                name='name'
                placeholder='Ex: Comissão'
                value={name}
                onChange={handleChange}
                focused
                margin='normal'
                sx={{
                    width: '100%',
                }}
            />

            <h1 className={styles.titulos}>Tipo de grupo</h1>
            <Radio.Group style={{ display: 'flex' }} onChange={handleRadioChange} value={type_group} size='25'>
                <Radio value={"interno"} defaultChecked>Interno</Radio>
                <Radio value={"externo"}>Externo</Radio>
            </Radio.Group>

            <h1 className={styles.titulos}>Observações</h1>
            <TextArea
                placeholder='Digite aqui as observações'
                value={observations}
                rows={5}
                onChange={handleObservations}
            />
        </section>
    );
};

const StepGroupRegister = () => {
    const [formulario, setFormulario] = useState({
        entity: '',
        organ: '',
        council: '',
        acronym: '',
        internal_concierge: '',
        team: '',
        email: '',
        unit: '',
        office_requested: '',
        office_indicated: '',
    });

    const [representative, setRepresentative] = useState("");
    const [observations, setObservations] = useState([]);
    const [name, setName] = useState("");
    const [type_group, setType_group] = useState('interno');
    const [current, setCurrent] = useState(0);

    const navigate = useNavigate();

    const steps = [
        {
            title: 'Grupo',
            content: <FormSignGroup form={formulario} setForm={setFormulario} />,
        },
        {
            title: 'Representante',
            content: <RepresentanteGroup representative={representative} setRepresentative={setRepresentative} />,
        },
        {
            title: 'Observações',
            content: <Observations
                observations={observations}
                setObservations={setObservations}
                name={name}
                setName={setName}
                type_group={type_group}
                setType_group={setType_group}
            />,
        },
    ];

    const Submit = async (e) => {
        e.preventDefault();

        const updatedFormulario = {
            ...formulario,
            name,
            type_group,
            observations,
            representative
        };

        console.log(updatedFormulario)

        try {
            await api.post('group', updatedFormulario).then(() => {
                navigate('/gerente', {
                    state: {
                        message: 'Grupo criado com sucesso!',
                        messagetype: 'success',
                        showMessage: true,
                    }
                });
            });

        } catch (error) {
            console.error('Erro ao enviar formulário:', error.response.data);
        }
    };

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
    }));

    return (
        <Fragment>
            <Steps current={current} items={items} type="navigation" />
            <Divider />
            <form className={styles.form}>
                <div className={styles.container_step}>{steps[current].content}</div>

                <div className={styles.button_steps}>
                    {current > 0 && (
                        <Button className={styles.button_anterior} onClick={() => prev()}>Anterior</Button>
                    )}

                    {current < steps.length - 1 && (
                        <Button className={styles.button_proximo} onClick={() => next()} >
                            Próximo
                        </Button>
                    )}

                    {current === steps.length - 1 && (
                        <Button className={styles.button_feito} onClick={Submit}>
                            Feito
                        </Button>
                    )}
                </div>
            </form>
        </Fragment>
    );
};

export default StepGroupRegister;