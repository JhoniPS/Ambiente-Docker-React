import React, { Fragment, useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import api from "../../../services/api";

import HeaderBar from "../../layout/header/HeaderBar";
import Container from "../../layout/container/Container";
import Message from "../../layout/Message/Message";
import LinkButton from "../../layout/linkbutton/LinkButton";
import Card from "../../card/Card";

import { ImArrowLeft2 } from "react-icons/im";
import { Divider } from 'antd';
import style from "./OverviewGroupRepresentante.module.css"

import img1 from '../../../img/notas.svg'
import img2 from '../../../img/icon _work.svg'
import img3 from '../../../img/historico-reuniao.svg'
import img4 from '../../../img/documentos.png'

import TableGroupsDescription from "../../TableGroupsDescription/TableGroupsDescrition";
import TableDetalhe from "../../TableDetalhes/TableDetalhe";
import TableRepresentative from "../../TableRepresentative/TableRepresentative";
import TableMemberGroup from "../../TableMemberGroup/TableMemberGroup";
import Observations from "../../layout/Observations/Observations";


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
      <HeaderBar text="PAINEL DE CONTROLE" backPageIcon={<ImArrowLeft2 size={25} />} backPage="/groups-representante" />
      <div className={style.representatives}>
        <h2>Overview</h2>
        <Container customClass='start'>
          <Card
            icon={img1}
            customClass={'overViewCard'}
            title="Notas"
            description="Gerencia notas feitas pelo representante"
          />
          <Card
            icon={img2}
            customClass={'overViewCard'}
            title="Atividades"
            description="Gerencie atividades"
          />
          <Card
            icon={img3}
            customClass={'overViewCard'}
            title="Histórico de reuniões"
            description="Gerencie as reuniões realizadas"
            to={`/detalhes-de-grupos-representante/${id}/historico-de-reunioes`}
          />
          <Card
            icon={img4}
            customClass={'overViewCard'}
            title="Documentos"
            description="Gerencia documentos do grupo"
            to={`/detalhes-de-grupos-representante/${id}/documentos`}
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

        <TableMemberGroup members={members} setMembers={setMembers} rota={`detalhes-de-grupos-representante/${id}`} />
        {showMessage && <Message type={messageType} msg={message} setShowMessage={setShowMessage} />}

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

export default OverviewGroupRepresentante;