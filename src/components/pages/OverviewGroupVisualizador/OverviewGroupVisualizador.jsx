import React, { Fragment, useEffect, useState } from "react";
import { cilDescription, cilNotes, cilTask, cilList } from '@coreui/icons';
import { useParams } from "react-router-dom";
import useAuthContext from '../../contexts/Auth';
import api from "../../../services/api";

import Card from "../../card/Card";
import { Divider } from 'antd';

import TableGroupsDescription from "../../TableGroupsDescription/TableGroupsDescrition";
import TableDetalhe from "../../TableDetalhes/TableDetalhe";
import TableMemberGroup from "../../TableMemberGroup/TableMemberGroup";
import Observations from "../../layout/Observations/Observations";
import MenuAppBar from "../../layout/AppBar/MenuAppBar";
import { CCard, CCardBody, CRow } from "@coreui/react";
import ReportGroup from "../../report/ReportGroup";
import Message from "../../layout/Message/Message";

const OverviewGroupVisualizador = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [members, setMembers] = useState([]);
  const [observacao, setObservacao] = useState("");

  const {
    message,
    messageType,
    showMessage,
    setShowMessage,
    setError,
    setMessage,
    setMessageType
  } = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get(`groups/${id}`);
        const group = data.data;
        const members = data.data.members;
        const observacao = data.data.observations;

        setData(group);
        setMembers(members);
        setObservacao(observacao);
      } catch (error) {
        setError(true);
        setMessage(`${error.response.data.errors}`);
        setMessageType('error');
        setShowMessage(true);
      }
    };

    fetchData();
  }, [id, setError, setMessage, setMessageType, setShowMessage]);

  return (
    <Fragment>
      <MenuAppBar backStep="/visualizador" />
      <div className="d-flex flex-column p-5 gap-3 h-100">
        <div className="d-flex justify-content-between align-items-center">
          <h2>Visão Geral</h2>
          <ReportGroup />
        </div>

        <CRow>
          <Card
            icon={cilDescription}
            title="Notas"
            description="Gerencia Notas"
            to={`/visualizador-detalhes-de-grupos/${id}/notas`}
          />
          <Card
            icon={cilNotes}
            title="Documentos"
            description="Gerenciar Arquivos"
            to={`/visualizador-detalhes-de-grupos/${id}/documentos`}
          />
          <Card
            icon={cilTask}
            title="Atividades"
            description="Gerencia Tarefas"
            to={`/visualizador-detalhes-de-grupos/${id}/atividades`}
          />
          <Card
            icon={cilList}
            title="Reuniões"
            description="Gerencia reuniões"
            to={`/visualizador-detalhes-de-grupos/${id}/historico-de-reunioes`}
          />
        </CRow>

        <TableGroupsDescription description={data} />

        <Divider />

        <CCard style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <CCardBody>
            <h2 style={{ paddingLeft: '15px' }}>Detalhes</h2>
            <TableDetalhe data={data} />
          </CCardBody>
        </CCard>

        <CCard style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <CCardBody>
            <div className="d-flex justify-content-between align-items-center w-100 h-auto">
              <h2>Membros</h2>
            </div>
            <TableMemberGroup members={members} setMembers={setMembers} />
          </CCardBody>
        </CCard>

        <CCard style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <CCardBody>
            <h2>Observações</h2>
            <Observations data={observacao} />
          </CCardBody>
        </CCard>
      </div>
      {showMessage && <Message type={messageType} msg={message} setShowMessage={setShowMessage} />}
    </Fragment >
  );
};

export default OverviewGroupVisualizador;