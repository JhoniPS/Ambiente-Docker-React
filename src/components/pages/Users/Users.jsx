import { Fragment, useState, useEffect } from "react";
import SubmitButton from "../../layout/submitbuttun/SubmitButton"
import TypeUsers from '../TypeUsers/TypeUsers'

import { IoMdAdd } from "react-icons/io";
import style from "./Users.module.css"

import TableUser from "../../TableUser/TableUser";
import { IconContext } from "react-icons";
import LinkButton from "../../layout/linkbutton/LinkButton";
import { useLocation } from "react-router-dom";
import Message from "../../layout/Message/Message";
import FilterUser from "../../layout/filterUser/FilterUser";
import { CCard, CCardBody } from "@coreui/react";

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
      <div class="d-flex flex-column p-4 gap-3 h-100">
        <CCard className="md-2">
          <CCardBody>
            <h2>Usuários</h2>
            <section class="d-flex gap-4 align-items-center">
              <LinkButton
                text="Adicionar Usuário"
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
            <section className="d-grid gap-2 d-md-flex justify-content-md-start">
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
          </CCardBody>
        </CCard>


        <CCard className="md-2">
          <CCardBody>
            <TypeUsers />
          </CCardBody>
        </CCard>
        {showMessage && <Message type={messageType} msg={message} setShowMessage={setShowMessage} />}
      </div>
    </Fragment>
  );
};

export default Users;