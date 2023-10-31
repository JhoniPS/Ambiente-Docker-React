import React, { Fragment } from 'react';
import MenuAppBar from '../../layout/AppBar/MenuAppBar';
import styles from './HomeStyle.module.css';
import Card from '../../card/Card';
import img from '../../../img/icon _group.svg';
import img2 from '../../../img/icon _work.svg';
import Container from '../../layout/container/Container';

const Home = () => {
  return (
    <Fragment>
      <MenuAppBar />
      <div className={styles.admin}>
        <h2>OLÁ, ADMINISTRADOR!</h2>
        <Container customClass='start'>
          <Card
            icon={img}
            title="USUÁRIOS"
            description="Gerenciar usuários do sistema"
            to="/users"
          />

          <Card
            icon={img2}
            title="TIPOS DE USUÁRIOS"
            description="Gerenciar tipos de usuário do sistema"
            to="/Tipos-de-Usuarios"
          />
        </Container>
      </div>
    </Fragment>
  );
}

export default Home;