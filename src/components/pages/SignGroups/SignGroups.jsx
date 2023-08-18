
import styles from './SignGroups.module.css';

import HeaderBar from '../../layout/header/HeaderBar';
import { ImArrowLeft2 } from "react-icons/im";
import { Fragment } from 'react';
import FormSignGroup from '../../Forms/formSignGroup/FormSignGroup';

const EditorProfile = () => {
  return (
    <Fragment>
      <HeaderBar text="PAINEL DE CONTROLE" backPageIcon={<ImArrowLeft2 size={25} />} backPage="/groups" />
      <div className={styles.sign_groups}>
        <section>
          <h3>Cadastrar Grupo</h3>
          <FormSignGroup />
        </section>
      </div>
    </Fragment>
  )
}

export default EditorProfile;