import React, { Fragment } from "react";
import { useLocation } from "react-router-dom";
import Message from "../../layout/Message/Message";

import TableTypeUser from "../../TableTypeUser/TableTypeUser";
import LinkButton from "../../layout/linkbutton/LinkButton";
import { ImArrowLeft2 } from "react-icons/im";
import { IoMdAdd } from "react-icons/io";
import HeaderBar from "../../layout/header/HeaderBar";
import style from './TypeUsers.module.css'
import { IconContext } from "react-icons";


const TypeUsers = () => {

    const location = useLocation();
    let message = '';
    let messageType = '';

    if (location.state) {
        message = location.state.message;
        messageType = location.state.messageType
    }

    return (
        <Fragment>
            <HeaderBar text="PAINEL DE CONTROLE" backPageIcon={<ImArrowLeft2 size={25} />} backPage="/administrador" />
            <div className={style.typeUsers}>
                <h2>Tipos de Usuários</h2>
                <section className={style.section_search}>
                    <LinkButton
                        text="Adicionar novo tipo"
                        customClass="add"
                        to="/Novo-tipo"
                        icon={
                            <IconContext.Provider value={{ size: 25 }}>
                                <IoMdAdd />
                            </IconContext.Provider>
                        }
                    />
                </section>
                <TableTypeUser />
                {message && <Message type={messageType} msg={message} />}
            </div>
        </Fragment>
    );
}

export default TypeUsers;