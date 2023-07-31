import React, { Fragment } from 'react';
import MenuAppBar from '../../layout/AppBar/MenuAppBar';

import styles from './HomeStyle.module.css'
import Card from '../../card/Card';
import img from '../../../img/icon _group.svg'
import img2 from '../../../img/icon _work.svg'
import img3 from '../../../img/verificacao-de-lista.svg'
import img4 from '../../../img/historico-reuniao.svg'
import img5 from '../../../img/atividades.svg'
import img6 from '../../../img/notas.svg'

const Home = () => {
    return (
        <Fragment>
            <MenuAppBar />
            <div className={styles.admin}>
                <h2>OLÁ, REPRESENTANTE!</h2>
                <div>
                    <Card
                        icon={img}
                        title="MEMBROS"
                        description="Gerenciar membros dos grupos"
                    />
                    <Card
                        icon={img2}
                        title="MEUS GRUPOS"
                        description="Gerenciar grupos do sistema"
                    />
                    <Card
                        icon={img3}
                        title="TAREFAS"
                        description="Gerencie suas tarefas"
                    />
                    <Card
                        icon={img4}
                        title="HISTÓRICO DAS REUNIÕES"
                        description="Registre das reuniões realizadas"
                    />
                    <Card
                        icon={img5}
                        title="ATIVIDADES"
                        description="Registro de atividades"
                    />
                    <Card
                        icon={img6}
                        title="NOTAS"
                        description="Gerencie suas notas"
                    />
                </div>
            </div>
        </Fragment>
    );
}

export default Home;