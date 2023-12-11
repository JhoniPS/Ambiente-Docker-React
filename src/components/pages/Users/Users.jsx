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
import FilterUser from "../../layout/filterUser/FilterUser";

const Users = () => {
  const location = useLocation();

  const [data, setData] = useState([]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [sortOrder, setSortOrder] = useState("desc");

  const sortUsers = () => {
    return [...data].sort((a, b) => {
      if (sortOrder === "desc") {
        return new Date(b.created_at) - new Date(a.created_at);
      } else {
        return new Date(a.created_at) - new Date(b.created_at);
      }
    });
  };

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
          <FilterUser setData={setData} />
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
        <TableUser data={sortUsers()} setData={setData} />
        {showMessage && <Message type={messageType} msg={message} setShowMessage={setShowMessage} />}
      </div>
    </Fragment>
  );
};

export default Users;