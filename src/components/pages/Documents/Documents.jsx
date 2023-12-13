import React, { Fragment, useEffect, useState } from 'react'
import { useLocation, useParams } from "react-router-dom";
import Cookies from 'js-cookie'

import HeaderBar from '../../layout/header/HeaderBar';
import SubmitButton from '../../layout/submitbuttun/SubmitButton';
import style from './Documents.module.css'

import { ImArrowLeft2 } from "react-icons/im";
import TableDocumentos from '../../TableDocumentos/TableDocumentos';
import AddDocuments from '../../Modals/modal_sign_document/AddDocuments';
import api from '../../../services/api';

function Documents() {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [sortOrder, setSortOrder] = useState("desc");

    const location = useLocation();
    const backPage = location.pathname.replace("/documentos", '');
    const userRole = Cookies.get('userType');

    const sortDocs = () => {
        return [...data].sort((a, b) => {
            if (sortOrder === "desc") {
                return new Date(b.created_at) - new Date(a.created_at);
            } else {
                return new Date(a.created_at) - new Date(b.created_at);
            }
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await api.get(`group/${id}/documents`);
                setData(data)
            } catch (error) {

            }
        }
        fetchData();
    }, [id]);

    return (
        <Fragment>
            <HeaderBar text="PAINEL DE CONTROLE" backPageIcon={<ImArrowLeft2 size={25} />} backPage={backPage} />
            <div className={style.container}>
                <h2>Documentos</h2>

                {
                    userRole === 'representante' &&
                    <section className={style.section_filter}>
                        <AddDocuments data={data} setData={setData} />
                    </section>
                }

                <h4>FILTROS RÁPIDOS</h4>
                <section className={style.button_filters}>
                    <SubmitButton
                        text="Mais Recentes"
                        customClass="button_filtes_bar"
                        onClick={() => setSortOrder("desc")}
                    />
                    <SubmitButton
                        text="Mais Antigos"
                        customClass="button_filtes_bar"
                        onClick={() => setSortOrder("asc")}
                    />
                </section>
                <TableDocumentos data={sortDocs()} setData={setData} />
            </div>
        </Fragment>
    );
}

export default Documents;