import React, { Fragment, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Message from "../../layout/Message/Message";

import TableTypeUser from "../../TableTypeUser/TableTypeUser";
import LinkButton from "../../layout/linkbutton/LinkButton";
import { IoMdAdd } from "react-icons/io";
import { IconContext } from "react-icons";


const TypeUsers = () => {
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location.state) {
            setMessage(location.state.message);
            setMessageType(location.state.messageType);
            setShowMessage(location.state.showMessage);
        }

    }, [location.state]);

    return (
        <Fragment>
            <div className="d-flex flex-column gap-4">
                <h2>Tipos de Usuários</h2>
                <section className="mb-0">
                    <LinkButton
                        text="Adicionar novo tipo"
                        customClass="primary"
                        to="/Novo-tipo"
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