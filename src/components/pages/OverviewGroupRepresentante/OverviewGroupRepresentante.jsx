import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuthContext from '../../contexts/Auth';
import api from "../../../services/api";

import Message from "../../layout/Message/Message";
import LinkButton from "../../layout/linkbutton/LinkButton";
import Card from "../../card/Card";
import { IoMdAdd } from 'react-icons/io';

import { Divider } from 'antd';

import TableGroupsDescription from "../../TableGroupsDescription/TableGroupsDescrition";
import TableDetalhe from "../../TableDetalhes/TableDetalhe";
import TableMemberGroup from "../../TableMemberGroup/TableMemberGroup";
import Observations from "../../layout/Observations/Observations";
import MenuAppBar from "../../layout/AppBar/MenuAppBar";

import { CCard, CCardBody, CRow } from "@coreui/react";
import { cilDescription, cilNotes, cilTask, cilList } from '@coreui/icons';

const OverviewGroupRepresentante = () => {
  const { id } = useParams();
  const [data, setData] = useState({});

  const [members, setMembers] = useState([]);
  const [observacao, setObservacao] = useState("");

  const { message, messageType, showMessage, setShowMessage } = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get(`group/${id}`);
        const group = data.data;
        const members = data.data.members;
        const observacao = data.data.observations;

        setData(group);
        setMembers(members);
        setObservacao(observacao);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <Fragment>
      <MenuAppBar backStep="/representante" />
      <div className="d-flex flex-column p-4 gap-2 h-100">
        <h2>Visão Geral</h2>
        <CRow>
          <Card
            icon={cilDescription}
            title="Notas"
            description="Gerencia Notas"
            to={`/representante-detalhes-de-grupos/${id}/notas`}
          />
          <Card
            icon={cilNotes}
            title="Documentos"
            description="Gerencia documentos"
            to={`/representante-detalhes-de-grupos/${id}/documentos`}
          />
          <Card
            icon={cilTask}
            title="Atividades"
            description="Gerencia atividades"
            to={`/representante-detalhes-de-grupos/${id}/atividades`}
          />
          <Card
            icon={cilList}
            title="Reuniões"
            description="Gerencia reuniões"
            to={`/representante-detalhes-de-grupos/${id}/historico-de-reunioes`}
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
                icon={<IoMdAdd size={22} />}
              />
            </div>
            <TableMemberGroup members={members} setMembers={setMembers} />
          </CCardBody>
        </CCard>
        {showMessage && <Message type={messageType} msg={message} setShowMessage={setShowMessage} />}

        <div className="d-flex flex-nowrap justify-content-around gap-2">
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