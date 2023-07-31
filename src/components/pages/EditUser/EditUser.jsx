
import React, {Fragment} from 'react';
import FormEditUser from '../../formEditUser/FormEditUser'
import HeaderBar from '../../layout/header/HeaderBar';

import { ImArrowLeft2 } from "react-icons/im";
import styles from './EditUser.module.css'

const EditorProfile = () => {
    return (
      <Fragment>
        <HeaderBar text="PAINEL DE CONTROLE" backPageIcon={<ImArrowLeft2 size={25} />} backPage="/" />
        <div className={styles.edit_user}>
          <section>
            <h4>Editar Usuário</h4>
            <FormEditUser />
          </section>
        </div>
      </Fragment>
    )
  }
  
  export default EditorProfile;