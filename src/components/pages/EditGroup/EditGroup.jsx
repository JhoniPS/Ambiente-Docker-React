
import React, { Fragment } from 'react';

import FormEditGroup from "../../formEditGroup/FormEditGroup"
import HeaderBar from '../../layout/header/HeaderBar';

import { ImArrowLeft2 } from "react-icons/im";
import styles from './EditGroups.module.css'

const EditGroup = () => {
  return (
    <Fragment>
      <HeaderBar text="PAINEL DE CONTROLE" backPageIcon={<ImArrowLeft2 size={25} />} backPage="/groups" />
      <div className={styles.edit_group}>
        <section>
          <h4>Editar Grupo</h4>
          <FormEditGroup />
        </section>
      </div>
    </Fragment>
  )
}

export default EditGroup;