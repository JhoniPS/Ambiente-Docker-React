import React, { Fragment, useEffect, useState } from 'react';
import api from '../../services/api';

import { Button, Steps, Divider, Select, Radio } from 'antd';
import FormSignGroup from '../Forms/formSignGroup/FormSignGroup';
import styles from './StepGroupRegister.module.css';
import TextArea from 'antd/es/input/TextArea';

const RepresentanteGroup = ({ setRepresentatives }) => {
    const [option, setOption] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('users');

                const representantesFiltrados = response.data.data.filter(
                    (user) => user.type_user === 'representante'
                );

                setOption(
                    representantesFiltrados.map((rep) => ({
                        id: rep.id,
                        name: rep.name,
                        email: rep.email,
                        type_user: rep.type_user,
                    }))
                );
            } catch (error) {
                console.error('Erro ao buscar os representantes:', error);
            }
        };

        fetchData();
    }, []);

    const handleChange = (selectedValues) => {
        setRepresentatives(selectedValues);
    };

    return (
        <section className={styles.representantes}>
            <h1>Representante</h1>
            <Select
                mode="multiple"
                allowClear
                style={{ width: '100%', height: '4em' }}
                placeholder="Selecione o representante"
                onChange={handleChange}
                filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={option.map((rep) => ({ value: rep.id, label: rep.name }))}
            />
        </section>
    );
};

const Observations = ({ observations, setObservations, setType_group_id }) => {
    const [option, setOption] = useState([]);

    const handleObservations = (e) => {
        setObservations(e.target.value)
    }

    const handleChange = (selectedValues) => {
        setType_group_id(selectedValues)
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('type-group');

                const representantesFiltrados = response.data

                setOption(
                    representantesFiltrados.map((rep) => ({
                        id: rep.id,
                        name: rep.name,
                    }))
                );
            } catch (error) {
                console.error('Erro ao buscar os representantes:', error);
            }
        };

        fetchData();
    }, []);

    // const handleRadioChange = (e) => {
    //     setType_group(prev => ({
    //         ...prev,
    //         type_group: e.target.value,
    //     }));
    // };

    return (
        <section className={styles.observacoes}>
            <h1>Observações</h1>
            <TextArea
                placeholder='Digite aqui as observações'
                value={observations}
                rows={5}
                onChange={handleObservations}
            />
            <h1>Tipo de grupo</h1>
            <Select
                allowClear
                style={{ width: '100%', height: '4em' }}
                placeholder="Selecione o tipo de grupo"
                onChange={handleChange}
                filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={option.map((rep) => ({ value: rep.id, label: rep.name }))}
            />

            {/* <Radio.Group style={{ display: 'flex', flexDirection: 'column' }} onChange={handleRadioChange} value={type_group.type_group} size='20'>
                <Radio value={"interno"} defaultChecked>Interno</Radio>
                <Radio value={"externo"}>Externo</Radio>
            </Radio.Group> */}
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

    const [representatives, setRepresentatives] = useState([]);
    const [observations, setObservations] = useState([]);
    const [type_group_id, setType_group_id] = useState(0);
    const [current, setCurrent] = useState(0);

    const steps = [
        {
            title: 'Grupo',
            content: <FormSignGroup form={formulario} setForm={setFormulario} />,
        },
        {
            title: 'Representantes',
            content: <RepresentanteGroup setRepresentatives={setRepresentatives} />,
        },
        {
            title: 'Observações',
            content: <Observations
                observations={observations}
                setObservations={setObservations}
                type_group_id={type_group_id}
                setType_group_id={setType_group_id}
            />,
        },
    ];

    const Submit = async (e) => {
        e.preventDefault();

        setFormulario(prev => ({
            ...prev,
            type_group_id,
            observations,
            representatives
        }));

        const updatedFormulario = {
            ...formulario,
            type_group_id,
            observations,
            representatives
        };

        try {
            const response = await api.post('group', updatedFormulario);
            console.log('Resposta do servidor:', response.data);
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
            <Steps current={current} items={items} />
            <Divider />
            <form className={styles.form}>
                <div className={styles.container_step}>{steps[current].content}</div>

                <div className={styles.button_steps}>
                    {current > 0 && (
                        <Button onClick={() => prev()}>Previous</Button>
                    )}

                    {current < steps.length - 1 && (
                        <Button type="primary" onClick={() => next()}>
                            Next
                        </Button>
                    )}

                    {current === steps.length - 1 && (
                        <Button type="primary" onClick={Submit}>
                            Done
                        </Button>
                    )}
                </div>
            </form>
        </Fragment>
    );
};

export default StepGroupRegister;