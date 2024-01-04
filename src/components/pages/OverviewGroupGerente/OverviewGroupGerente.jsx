import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { cilDescription, cilNotes, cilTask, cilList } from '@coreui/icons';
import { Divider } from 'antd';
import { CCard, CCardBody, CRow } from "@coreui/react";
import api from "../../../services/api";

import MenuAppBar from "../../layout/AppBar/MenuAppBar";
import Card from "../../card/Card";

import TableGroupsDescription from "../../TableGroupsDescription/TableGroupsDescrition";
import TableDetalhe from "../../TableDetalhes/TableDetalhe";
import TableRepresentativeGroup from "../../TableRepresentativeGroup/TableRepresentativeGroup";
import TableMemberGroup from "../../TableMemberGroup/TableMemberGroup";
import Observations from "../../layout/Observations/Observations"

const OverviewGroupGerente = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [members, setMembres] = useState([]);
  const [observacao, setObservacao] = useState("");
  const [representatives, setRepresentatives] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get(`group/${id}`);

        const group = data.data;
        const members = data.data.members;
        const observacao = data.data.observations;
        const representatives = data.data.representatives;

        setData(group);
        setMembres(members);
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
            to={`/detalhes-de-grupos-gerente/${id}/notas`}
          />
          <Card
            icon={cilNotes}
            title="Documentos"
            description="Gerencia documentos do grupo"
            to={`/detalhes-de-grupos-gerente/${id}/documentos`}
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
            to={`/detalhes-de-grupos-gerente/${id}/historico-de-reunioes`}
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
            <h2>Membros</h2>
            <TableMemberGroup members={members} setMembres={setMembres} />
          </CCardBody>
        </CCard>

        <div className="d-flex flex-nowrap justify-content-around gap-2">
          <CCard className="d-flex flex-column gap-2 mb-3 w-100">
            <CCardBody>
              <h2>Representantes</h2>
              <TableRepresentativeGroup data={representatives} setData={setRepresentatives} />
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
    </Fragment >
  );
};

export default OverviewGroupGerente;