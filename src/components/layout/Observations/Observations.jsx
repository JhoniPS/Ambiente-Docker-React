import React from 'react';
import styles from './Observations.module.css'

const Observations = ({ data }) => {
    return (
        <section className={`p-3 border rounded overflow-y-auto ${styles.observacao}`} style={{ maxHeight: '220px'}}>
            {data}
        </section>
    );
}

export default Observations;
