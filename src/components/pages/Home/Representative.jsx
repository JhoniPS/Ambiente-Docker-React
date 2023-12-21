import React, { Fragment } from 'react';
import MenuAppBar from '../../layout/AppBar/MenuAppBar';
import GroupsRepresentante from '../GroupsRepresentante/GroupsRepresentante';

const Home = () => {
    return (
        <Fragment>
            <MenuAppBar />
            <GroupsRepresentante />
        </Fragment>
    );
}

export default Home;