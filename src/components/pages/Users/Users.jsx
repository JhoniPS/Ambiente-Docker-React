import { Fragment, useState, useEffect } from "react";
import api from "../../../services/api";

import TableUser from "../../TableUser/TableUser";
import Message from "../../layout/Message/Message";
import SubmitButton from "../../layout/submitbuttun/SubmitButton"
import TypeUsers from '../TypeUsers/TypeUsers'
import useAuthContext from '../../contexts/Auth';
import style from './Users.module.css'

import { CCard, CCardBody } from "@coreui/react";

const Users = () => {
  const [data, setData] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");

  const { message, messageType, showMessage, setShowMessage } = useAuthContext();

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
    const fetchData = async () => {
      try {
        await api.get('users').then((response) => {
          const users = response.data.data;
          setData(users);
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);


  return (
    <Fragment>
      <div className="d-flex flex-column p-4 gap-2 h-100">
        <CCard className="md-2">
          <CCardBody className="d-flex flex-column gap-3">
            <h2 className="mb-0">Usuários</h2>
            <h4 className={style}>FILTROS RÁPIDOS</h4>
            <section className="d-grid gap-2 d-md-flex justify-content-md-start mb-0">
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