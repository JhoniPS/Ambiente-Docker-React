import React, { Fragment } from "react";
import Message from "../../layout/Message/Message";
import useAuthContext from '../../contexts/Auth';

import TableTypeUser from "../../TableTypeUser/TableTypeUser";
import LinkButton from "../../layout/linkbutton/LinkButton";
import { IoMdAdd } from "react-icons/io";
import { IconContext } from "react-icons";

const TypeUsers = () => {
    const { message, messageType, showMessage, setShowMessage } = useAuthContext();

    return (
        <Fragment>
            <div className="d-flex flex-column gap-4">
                <h2>Tipos de Usuários</h2>
                <section className="mb-0">
                    <LinkButton
                        text="Adicionar novo tipo"
                        customClass="primary"
                        to="/administrador-novo-tipo"
                        icon={
                            <IconContext.Provider value={{ size: 25 }}>
                                <IoMdAdd />
                            </IconContext.Provider>
                        }
                    />
                </section>
                <TableTypeUser />
                {showMessage && <Message type={messageType} msg={message} setShowMessage={setShowMessage} />}
            </div>
        </Fragment>
    );
}

export default TypeUsers;