import React, { Fragment } from 'react';
import MenuAppBar from '../../layout/AppBar/MenuAppBar';

import styles from './HomeStyle.module.css'
import Card from '../../card/Card';
import img from '../../../img/icon _group.svg'
import img2 from '../../../img/icon _work.svg'

const Home = () => {
    return (
        <Fragment>
            <MenuAppBar />
            <div className={styles.admin}>
                <h2>OLÁ, VISUALIZADOR!</h2>
                <div>
                    <Card
                        icon={img}
                        title="TAREFAS"
                        description="Gerenciar presentante do sistema"
                    />
                    <Card
                        icon={img2}
                        title="GRUPOS"
                        description="Gerenciar grupos do sistema"
                    />
                    <Card
                        icon={img}
                        title="HISTÓRICO DAS REUNIÕES"
                        description="Registre das reuniões realizadas"
                    />
                    <Card
                        icon={img}
                        title="NOTAS E REGISTROS"
                        description="Gerencie suas notas"
                    />
                </div>
            </div>
        </Fragment>
    );
}

export default Home;