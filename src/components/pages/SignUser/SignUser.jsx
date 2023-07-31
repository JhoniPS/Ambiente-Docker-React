

import styles from './SignUser.module.css'
import FormSignUser from '../../formSignUser/FormSignUser';
import HeaderBar from '../../layout/header/HeaderBar';
import { ImArrowLeft2 } from "react-icons/im";
import { Fragment } from 'react';

const EditorProfile = () => {
  return (
    <Fragment>
      <HeaderBar text="PAINEL DE CONTROLE" backPageIcon={<ImArrowLeft2 size={25} />} backPage="/" />
      <div className={styles.sign_user}>
        <section>
          <h4>Cadastrar Usuário</h4>
          <FormSignUser />
        </section>
      </div>
    </Fragment>
  )
}

export default EditorProfile;