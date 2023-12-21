import React, { Fragment } from 'react';
import MenuAppBar from '../../layout/AppBar/MenuAppBar';
import styles from './HomeStyle.module.css';
import Card from '../../card/Card';
import img from '../../../img/icon _group.svg';
import Container from '../../layout/container/Container';
import Users from '../Users/Users';

const Home = () => {
  return (
    <Fragment>
      <MenuAppBar />
      <Users />
    </Fragment>
  );
}

export default Home;