import { Fragment } from "react";
import TableUser from "../../TableUser/TableUser";
import Message from "../../layout/Message/Message";
import TypeUsers from '../TypeUsers/TypeUsers'
import useAuthContext from '../../contexts/Auth';

import { CCard, CCardBody } from "@coreui/react";

const Users = () => {
  const {
    message,
    messageType,
    showMessage,
    setShowMessage
  } = useAuthContext();

  return (
    <Fragment>
      <div className="d-flex flex-column p-4 gap-2 h-100">
        <CCard className="md-2">
          <CCardBody className="d-flex flex-column gap-3">
            <h2 className="mb-0">Usuários</h2>
            <TableUser />
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