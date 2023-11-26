import { Fragment, useState } from "react";
import HeaderBar from "../../layout/header/HeaderBar";
import SubmitButton from "../../layout/submitbuttun/SubmitButton"

import { ImArrowLeft2 } from "react-icons/im";
import { IoIosFunnel } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import style from "./Users.module.css"

import TableUser from "../../TableUser/TableUser";
import Modal from "../../Modals/modal_filter_user/Modal";
import { IconContext } from "react-icons";
import LinkButton from "../../layout/linkbutton/LinkButton";
import { useLocation } from "react-router-dom";
import Message from "../../layout/Message/Message";

const Users = () => {
  const [openModal, setOpenModal] = useState(false);

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
      <div className={style.users}>
        <h2>Usuários</h2>
        <section className={style.section_search}>
          <SubmitButton
            text="Filtro"
            customClass="button_filter"
            onClick={() => setOpenModal(true)}
            icon={
              <IconContext.Provider value={{ size: 20 }}>
                <IoIosFunnel />
              </IconContext.Provider>
            }
          />
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

        <Modal openModal={openModal} setOpenModal={() => setOpenModal(!openModal)} />

        <h4>FILTROS RÁPIDOS</h4>
        <section className={style.button_filters}>
          <SubmitButton text="Mais Recentes" customClass="button_filtes_bar" />
          <SubmitButton text="Mais Antigos" customClass="button_filtes_bar" />
        </section>
        <TableUser />
        {message && <Message type={messageType} msg={message} />}
      </div>
    </Fragment>
  );
};

export default Users;