import React, { Fragment } from 'react';
import MenuAppBar from '../../layout/AppBar/MenuAppBar';
import GroupsGerente from '../GroupsGerente/GroupsGerente';

const Home = () => {
    return (
        <Fragment>
            <MenuAppBar backStep='/gerente' />
            <GroupsGerente />
        </Fragment>
    );
}

export default Home;