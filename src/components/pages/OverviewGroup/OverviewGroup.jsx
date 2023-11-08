import React, { Fragment } from "react";
import HeaderBar from "../../layout/header/HeaderBar";
import TableRepresentative from "../../TableRepresentative/TableRepresentative";

import { ImArrowLeft2 } from "react-icons/im";
import style from "./OverviewGroup.module.css"
import Container from "../../layout/container/Container";
import Card from "../../card/Card";
import { Divider } from 'antd';

import img from '../../../img/icon _group.svg'
import img2 from '../../../img/icon _work.svg'
import img3 from '../../../img/verificacao-de-lista.svg'
import TableGroupsDescription from "../../TableGroupsDescription/TableGroupsDescrition";
import TableDetalhe from "../../TableDetalhes/TableDetalhe";

const OverviewGroup = () => {
  return (
    <Fragment>
      <HeaderBar text="PAINEL DE CONTROLE" backPageIcon={<ImArrowLeft2 size={25} />} backPage="/groups" />
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

        <TableGroupsDescription />

        <Divider />

        <h2>Detalhes</h2>
        <TableDetalhe />

        <h2>Membros</h2>
        <TableRepresentative />

        <h2>Representantes</h2>
        <TableRepresentative />

      </div>
    </Fragment>
  );
};

export default OverviewGroup;