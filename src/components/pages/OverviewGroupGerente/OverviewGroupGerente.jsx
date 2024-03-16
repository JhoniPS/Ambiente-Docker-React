import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { cilDescription, cilNotes, cilTask, cilList } from '@coreui/icons';
import { CCard, CCardBody, CRow } from "@coreui/react";
import api from "../../../services/api";

import MenuAppBar from "../../layout/AppBar/MenuAppBar";
import LinkButton from "../../layout/linkbutton/LinkButton";
import Card from "../../card/Card";
import { IoMdAdd } from 'react-icons/io';

import TableGroupsDescription from "../../TableGroupsDescription/TableGroupsDescrition";
import TableDetalhe from "../../TableDetalhes/TableDetalhe";
import TableMemberGroup from "../../TableMemberGroup/TableMemberGroup";
import Observations from "../../layout/Observations/Observations"
import ReportGroup from "../../report/ReportGroup";

const OverviewGroupGerente = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [observacao, setObservacao] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get(`groups/${id}`);
        const group = data.data;
        const observacao = data.data.observations;

        setData(group);
        setObservacao(observacao);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <Fragment>
      <MenuAppBar backStep="/gerente" />
      <div className="d-flex flex-column p-5 gap-3 h-100">
        <div className="d-flex justify-content-between align-items-center">
          <h2>Visão Geral</h2>
          <ReportGroup />
        </div>

        <CRow>
          <Card
            icon={cilDescription}
            title="Notas"
            description="Gerenciar Notas"
            to={`/gerente-detalhes-de-grupos/${id}/notas`}
          />
          <Card
            icon={cilNotes}
            title="Documentos"
            description="Gerenciar Arquivos"
            to={`/gerente-detalhes-de-grupos/${id}/documentos`}
          />
          <Card
            icon={cilTask}
            title="Atividades"
            description="Gerenciar Tarefas"
            to={`/gerente-detalhes-de-grupos/${id}/atividades`}
          />
          <Card
            icon={cilList}
            title="Reuniões"
            description="Gerenciar Reuniões"
            to={`/gerente-detalhes-de-grupos/${id}/historico-de-reunioes`}
          />
        </CRow>

        <TableGroupsDescription description={data} />

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
              <LinkButton
                text="Adicionar Membro"
                to="adicionar-membro"
                icon={<IoMdAdd size={22} />}
              />
            </div>
            <TableMemberGroup />
          </CCardBody>
        </CCard>

        <CCard style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <CCardBody>
            <h2>Observações</h2>
            <Observations data={observacao} />
          </CCardBody>
        </CCard>
      </div>
    </Fragment >
  );
};

export default OverviewGroupGerente;