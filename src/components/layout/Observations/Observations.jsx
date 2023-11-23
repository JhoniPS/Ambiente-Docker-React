import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import useAuthContext from '../../contexts/Auth';
import api from '../../../services/api';
import styles from './Observations.module.css'

const Observations = () => {
    const { token } = useAuthContext();
    const { id } = useParams();
    const [observacao, setObservacao] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            if (token) {
                try {
                    const response = await api.get(`group/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    setObservacao(response.data.data.observations);
                } catch (error) {
                    console.error("Erro ao buscar dados do grupo:", error);
                }
            }
        };

        fetchData();
    }, [token, id]);

    return (
        <section className={styles.observacao}>
            {observacao || "Sem observações"}
        </section>
    );
}

export default Observations;
