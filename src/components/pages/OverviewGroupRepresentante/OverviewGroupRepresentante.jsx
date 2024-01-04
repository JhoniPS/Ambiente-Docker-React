import React, { Fragment, useEffect, useState } from "react";
import { cilDescription, cilNotes, cilTask, cilList } from '@coreui/icons';
import { useParams, useLocation } from "react-router-dom";
import api from "../../../services/api";

import Message from "../../layout/Message/Message";
import LinkButton from "../../layout/linkbutton/LinkButton";
import Card from "../../card/Card";

import { Divider } from 'antd';

import TableGroupsDescription from "../../TableGroupsDescription/TableGroupsDescrition";
import TableDetalhe from "../../TableDetalhes/TableDetalhe";
import TableMemberGroup from "../../TableMemberGroup/TableMemberGroup";
import Observations from "../../layout/Observations/Observations";
import MenuAppBar from "../../layout/AppBar/MenuAppBar";
import { CCard, CCardBody, CRow } from "@coreui/react";
import TableRepresentativeGroup from "../../TableRepresentativeGroup/TableRepresentativeGroup";


const OverviewGroupRepresentante = () => {
  const { id } = useParams();
  const [data, setData] = useState({});

  const [members, setMembers] = useState([]);
  const [observacao, setObservacao] = useState("");
  const [representatives, setRepresentatives] = useState([]);
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

    window.history.replaceState(null, '');
  }, [location.state]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get(`group/${id}`);
        const group = data.data;
        const members = data.data.members;
        const observacao = data.data.observations;
        const representatives = data.data.representatives;

        setData(group);
        setMembers(members);
        setObservacao(observacao);
        setRepresentatives(representatives);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <Fragment>
      <MenuAppBar />
      <div className="d-flex flex-column p-4 gap-2 h-100">
        <h2>Overview</h2>
        <CRow>
          <Card
            icon={cilDescription}
            title="Notas"
            description="Gerencie suas Notas"
            to={`/detalhes-de-grupos-representante/${id}/notas`}
          />
          <Card
            icon={cilNotes}
            title="Documentos"
            description="Gerencia documentos do grupo"
            to={`/detalhes-de-grupos-representante/${id}/documentos`}
          />
          <Card
            icon={cilTask}
            title="Atividades"
            description="Gerenciar suas atividades"
          />
          <Card
            icon={cilList}
            title="Histórico de reuniões"
            description="Gerencie as reuniões"
            to={`/detalhes-de-grupos-representante/${id}/historico-de-reunioes`}
          />
        </CRow>

        <TableGroupsDescription description={data} />

        <Divider />

        <CCard>
          <CCardBody>
            <h2 style={{ paddingLeft: '15px' }}>Detalhes</h2>
            <TableDetalhe data={data} />
          </CCardBody>
        </CCard>

        <CCard>
          <CCardBody>
            <div className="d-flex justify-content-between align-items-center w-100 h-auto">
              <h2>Membros</h2>
              <LinkButton
                text="Adicionar Membro"
                to="adicionar-membro"
                customClass="add"
              />
            </div>
            <TableMemberGroup members={members} setMembers={setMembers} />
          </CCardBody>
        </CCard>
        {showMessage && <Message type={messageType} msg={message} setShowMessage={setShowMessage} />}

        <div className="d-flex flex-nowrap justify-content-around gap-2">
          <CCard className="d-flex flex-column gap-2 mb-3 w-100">
            <CCardBody>
              <h2>Representantes</h2>
              <TableRepresentativeGroup data={representatives} />
            </CCardBody>
          </CCard>

          <CCard className="d-flex flex-column gap-2 mb-3 w-100">
            <CCardBody>
              <h2>Observações</h2>
              <Observations data={observacao} />
            </CCardBody>
          </CCard>
        </div>
      </div>
    </Fragment>
  );
};

export default OverviewGroupRepresentante;