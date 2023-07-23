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
                <h2>OLÁ, ADMINISTRADOR!</h2>
                <div>
                    <Card
                        icon={img}
                        title="USUÁRIOS"
                        description="Gerenciar usuários do sistema"
                    />
                    <Card 
                        icon={img2} 
                        title="TIPOS USUÁRIOS"
                        description="Gerenciar tipos de usuário do sistema"
                    />
                </div>
            </div>
        </Fragment>
    );
}

export default Home;