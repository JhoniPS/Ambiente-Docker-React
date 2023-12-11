import { Fragment, useState, useEffect } from "react";
import HeaderBar from "../../layout/header/HeaderBar";
import SubmitButton from "../../layout/submitbuttun/SubmitButton"

import { ImArrowLeft2 } from "react-icons/im";
import { IoMdAdd } from "react-icons/io";
import style from "./Users.module.css"

import TableUser from "../../TableUser/TableUser";
import { IconContext } from "react-icons";
import LinkButton from "../../layout/linkbutton/LinkButton";
import { useLocation } from "react-router-dom";
import Message from "../../layout/Message/Message";

const Users = () => {
  const location = useLocation();

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (location.state) {
      setMessage(location.state.message);
      setMessageType(location.state.messageType);
      setShowMessage(location.state.showMessage);
    }

  }, [location.state]);

  return (
    <Fragment>
      <HeaderBar text="PAINEL DE CONTROLE" backPageIcon={<ImArrowLeft2 size={25} />} backPage="/administrador" />
      <div className={style.users}>
        <h2>Usuários</h2>
        <section className={style.section_search}>
          <LinkButton
            text="Adicionar Usuário"
            customClass="add"
            to="/signUser"
            icon={
              <IconContext.Provider value={{ size: 25 }}>
                <IoMdAdd />
              </IconContext.Provider>
            }
          />
        </section>

        <h4>FILTROS RÁPIDOS</h4>
        <section className={style.button_filters}>
          <SubmitButton text="Mais Recentes" customClass="button_filtes_bar" />
          <SubmitButton text="Mais Antigos" customClass="button_filtes_bar" />
        </section>
        <TableUser />
        {showMessage && <Message type={messageType} msg={message} setShowMessage={setShowMessage} />}
      </div>
    </Fragment>
  );
};

export default Users;