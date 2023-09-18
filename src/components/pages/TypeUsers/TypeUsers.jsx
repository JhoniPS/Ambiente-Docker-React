import React, { Fragment } from "react";

import HeaderBar from "../../layout/header/HeaderBar";
import { ImArrowLeft2 } from "react-icons/im";
import TableTypeUser from "../../TableTypeUser/TableTypeUser";

import style from './TypeUsers.module.css'

const TypeUsers = () => {
    return (
        <Fragment>
            <HeaderBar text="PAINEL DE CONTROLE" backPageIcon={<ImArrowLeft2 size={25} />} backPage="/" />
            <div className={style.typeUsers}>
                <h2>Tipos de Usuários</h2>
                <TableTypeUser />
            </div>
        </Fragment>
    );
}

export default TypeUsers;