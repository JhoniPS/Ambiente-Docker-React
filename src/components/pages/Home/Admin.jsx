import React, { Fragment } from 'react';
import MenuAppBar from '../../layout/AppBar/MenuAppBar';
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