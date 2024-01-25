import React, { Fragment, useEffect, useState } from "react";
import { cilDescription, cilNotes, cilTask, cilList } from '@coreui/icons';
import { useParams } from "react-router-dom";
import api from "../../../services/api";

import Card from "../../card/Card";
import { Divider } from 'antd';

import TableGroupsDescription from "../../TableGroupsDescription/TableGroupsDescrition";
import TableDetalhe from "../../TableDetalhes/TableDetalhe";
import TableMemberGroup from "../../TableMemberGroup/TableMemberGroup";
import Observations from "../../layout/Observations/Observations";
import MenuAppBar from "../../layout/AppBar/MenuAppBar";
import { CCard, CCardBody, CRow } from "@coreui/react";

const OverviewGroupVisualizador = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [members, setMembers] = useState([]);
  const [observacao, setObservacao] = useState("");

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
      <MenuAppBar />
      <div className="d-flex flex-column p-4 gap-2 h-100">
        <h2>Overview</h2>
        <CRow>
          <Card
            icon={cilDescription}
            title="Notas"
            description="Gerencia Notas"
            to={`/detalhes-de-grupos-visualizador/${id}/notas`}
          />
          <Card
            icon={cilNotes}
            title="Documentos"
            description="Gerencia documentos"
            to={`/detalhes-de-grupos-visualizador/${id}/documentos`}
          />
          <Card
            icon={cilTask}
            title="Atividades"
            description="Gerencia atividades"
            to={`/detalhes-de-grupos-visualizador/${id}/atividades`}
          />
          <Card
            icon={cilList}
            title="Reuniões"
            description="Gerencia reuniões"
            to={`/detalhes-de-grupos-visualizador/${id}/historico-de-reunioes`}
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
            </div>
            <TableMemberGroup members={members} setMembers={setMembers} />
          </CCardBody>
        </CCard>

        <div className="d-flex flex-nowrap justify-content-around gap-2">
          <CCard className="d-flex flex-column gap-2 mb-3 w-100">
            <CCardBody>
              <h2>Observações</h2>
              <Observations data={observacao} />
            </CCardBody>
          </CCard>
        </div>
      </div>
    </Fragment >
  );
};

export default OverviewGroupVisualizador;