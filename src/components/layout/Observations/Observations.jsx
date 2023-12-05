import React from 'react';
import styles from './Observations.module.css'

const Observations = ({ data }) => {
    return (
        <section className={styles.observacao}>
            {data}
        </section>
    );
}

export default Observations;
