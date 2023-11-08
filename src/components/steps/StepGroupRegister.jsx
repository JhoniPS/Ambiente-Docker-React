import React, { Fragment, useState } from 'react';
import { Button, message, Steps, Divider } from 'antd';
import FormSignGroup from '../Forms/formSignGroup/FormSignGroup';
import styles from './StepGroupRegister.module.css'


const RepresentanteGroup = () => (
    <section>
        <h1>Representante</h1>
    </section>
);

const StepGroupRegister = () => {
    const [form, setForm] = useState({
        entity: "",
        organ: "",
        council: "",
        concierge: "",
        sigla: "",
        equip: "",
        email: "",
        unit: "",
        OfficeRequested: "",
        AppointedOffice: "",
    });

    const [current, setCurrent] = useState(0);

    const steps = [
        {
            title: 'Grupo',
            content: <FormSignGroup form={form} setForm={setForm} />,
        },
        {
            title: 'Representantes',
            content: <RepresentanteGroup />,
        },
        {
            title: 'Observações',
            content: 'Last-content',
        },
    ];

    const Submit = (e) => {
        e.preventDefault();
        console.log(form);
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
                <div className={styles.container_step}>
                    {steps[current].content}
                </div>

                <div className={styles.button_steps}>
                    {current > 0 && (
                        <Button onClick={() => prev()} >
                            Previous
                        </Button>
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



