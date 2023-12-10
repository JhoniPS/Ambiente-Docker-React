import React, { Fragment } from 'react';
import MenuAppBar from '../../layout/AppBar/MenuAppBar';

import styles from './HomeStyle.module.css'
import Card from '../../card/Card';

import img2 from '../../../img/icon _work.svg'

import Container from '../../layout/container/Container';

const Home = () => {
    return (
        <Fragment>
            <MenuAppBar />
            <div className={styles.admin}>
                <h2>OLÁ, VISUALIZADOR!</h2>
                <Container customClass='start'>
                    <Card
                        icon={img2}
                        title="GRUPOS"
                        description="Gerenciar grupos do sistema"
                        to="/groups-visualizador"
                    />
                </Container>
            </div>
        </Fragment>
    );
}

export default Home;