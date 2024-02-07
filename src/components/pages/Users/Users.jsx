import { Fragment, useState, useEffect } from "react";
import api from "../../../services/api";

import TableUser from "../../TableUser/TableUser";
import Message from "../../layout/Message/Message";
import TypeUsers from '../TypeUsers/TypeUsers'
import useAuthContext from '../../contexts/Auth';

import { CCard, CCardBody } from "@coreui/react";

const Users = () => {
  const [data, setData] = useState([]);

  const { message, messageType, showMessage, setShowMessage } = useAuthContext();

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

            <TableUser data={data} setData={setData} />
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