import React, { Fragment } from 'react';
import MenuAppBar from '../../layout/AppBar/MenuAppBar';

import styles from './HomeStyle.module.css'
import Card from '../../card/Card';

import img from '../../../img/icon _group.svg'
import img2 from '../../../img/icon _work.svg'
import img3 from '../../../img/verificacao-de-lista.svg'

const Home = () => {
    return (
        <Fragment>
            <MenuAppBar />
            <div className={styles.admin}>
                <h2>OLÁ, GERENTE!</h2>
                <div>
                    <Card
                        icon={img}
                        title="REPRESENTANTES"
                        description="Gerenciar presentante do sistema"
                    />
                    <Card
                        icon={img2}
                        title="GRUPOS"
                        description="Gerenciar grupos do sistema"
                        to="/groups"
                    />
                    <Card
                        icon={img3}
                        title="TAREFAS"
                        description="Gerencie suas tarefas"
                    />
                </div>
            </div>
        </Fragment>
    );
}

export default Home;