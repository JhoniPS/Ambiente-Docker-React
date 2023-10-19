import React, { Fragment } from 'react';
import MenuAppBar from '../../layout/AppBar/MenuAppBar';

import styles from './HomeStyle.module.css';
import Card from '../../card/Card';
import img from '../../../img/icon _group.svg';
import img2 from '../../../img/icon _work.svg';
import Container from '../../layout/container/Container';
import Grid from '@mui/material/Grid';

const Home = () => {
  return (
    <Fragment>
      <MenuAppBar />
      <div className={styles.admin}>
        <h2>OLÁ, ADMINISTRADOR!</h2>
        <Container customClass='start'>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Card
                icon={img}
                title="USUÁRIOS"
                description="Gerenciar usuários do sistema"
                to="/users"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card 
                icon={img2} 
                title="TIPOS USUÁRIOS"
                description="Gerenciar tipos de usuário do sistema"
                to="/Tipos-de-Usuarios"
              />
            </Grid>
          </Grid>
        </Container>
      </div>
    </Fragment>
  );
}

export default Home;
