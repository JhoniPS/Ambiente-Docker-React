import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../services/api";

import HeaderBar from "../../layout/header/HeaderBar";
import Container from "../../layout/container/Container";
import LinkButton from "../../layout/linkbutton/LinkButton";
import Card from "../../card/Card";

import { ImArrowLeft2 } from "react-icons/im";
import { Divider } from 'antd';
import style from "./OverviewGroupRepresentante.module.css"

import img from '../../../img/icon _group.svg'
import img2 from '../../../img/icon _work.svg'
import img3 from '../../../img/verificacao-de-lista.svg'

import TableGroupsDescription from "../../TableGroupsDescription/TableGroupsDescrition";
import TableDetalhe from "../../TableDetalhes/TableDetalhe";
import TableRepresentative from "../../TableRepresentative/TableRepresentative";
import TableMemberGroup from "../../TableMemberGroup/TableMemberGroup";
import Observations from "../../layout/Observations/Observations";


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
      <HeaderBar text="PAINEL DE CONTROLE" backPageIcon={<ImArrowLeft2 size={25} />} backPage="/groups-representante" />
      <div className={style.representatives}>
        <h2>Overview</h2>
        <Container customClass='start'>
          <Card
            icon={img}
            customClass={'overViewCard'}
            title="Notas"
            description="Gerenciar presentante do sistema"
          />
          <Card
            icon={img2}
            customClass={'overViewCard'}
            title="Atividades"
            description="Gerenciar grupos do sistema"
          />
          <Card
            icon={img3}
            customClass={'overViewCard'}
            title="Histórico de reuniões"
            description="Gerencie suas tarefas"
          />
          <Card
            icon={img3}
            customClass={'overViewCard'}
            title="Documentos"
            description="Gerencie suas tarefas"
          />
        </Container>

        <TableGroupsDescription description={data} />

        <Divider />

        <h2>Detalhes</h2>
        <TableDetalhe data={data} />

        <div className={style.tableMember}>
          <h2>Membros</h2>
          <LinkButton
            text="Adicionar Membro"
            to="adicionar-membro"
            customClass="add"
          />
        </div>

        <TableMemberGroup members={members} setMembres={setMembres} rota={`detalhes-de-grupos-representante/${id}`} />

        <div className={style.container_representantes_observacoes}>
          <section>
            <h2>Representantes</h2>
            <TableRepresentative data={representatives} />
          </section>
          <section className={style.observacoes}>
            <h2>Observações</h2>
            <Observations data={observacao} />
          </section>
        </div>
      </div>
    </Fragment>
  );
};

export default OverviewGroupGerente;