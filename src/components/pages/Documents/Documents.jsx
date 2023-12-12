import React, { Fragment, useState } from 'react'
import { useLocation } from "react-router-dom";
import HeaderBar from '../../layout/header/HeaderBar';
import LinkButton from '../../layout/linkbutton/LinkButton';
import SubmitButton from '../../layout/submitbuttun/SubmitButton';
import style from './Documents.module.css'

import { IconContext } from "react-icons";
import { IoMdAdd } from "react-icons/io";
import { ImArrowLeft2 } from "react-icons/im";
import TableDocumentos from '../../TableDocumentos/TableDocumentos';
import AddDocuments from '../../Modals/modal_sign_document/AddDocuments';

function Documents() {
    const [data, setData] = useState([]);
    const [sortOrder, setSortOrder] = useState("desc");

    const location = useLocation();
    const backPage = location.pathname.replace("/documentos", '');

    const sortDocs = () => {
        return [...data].sort((a, b) => {
            if (sortOrder === "desc") {
                return new Date(b.created_at) - new Date(a.created_at);
            } else {
                return new Date(a.created_at) - new Date(b.created_at);
            }
        });
    };

    return (
        <Fragment>
            <HeaderBar text="PAINEL DE CONTROLE" backPageIcon={<ImArrowLeft2 size={25} />} backPage={backPage} />
            <div className={style.container}>
                <h2>Documentos</h2>
                <section className={style.section_filter}>
                    <AddDocuments />
                </section>
                
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