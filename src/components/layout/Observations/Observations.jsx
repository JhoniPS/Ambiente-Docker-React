import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import api from '../../../services/api';
import styles from './Observations.module.css'

const Observations = () => {
    const { id } = useParams();
    const [observacao, setObservacao] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`group/${id}`);
                setObservacao(response.data.data.observations);
            } catch (error) {
                console.error("Erro ao buscar dados do grupo:", error);
            }
        };

        fetchData();
    }, [id]);

    return (
        <section className={styles.observacao}>
            {observacao}
        </section>
    );
}

export default Observations;
