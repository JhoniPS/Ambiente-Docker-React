
import React, { Fragment } from 'react';
import FormEditRepresentative from "../../Forms/formEditRepresentative/FormEditReprensetative"
import HeaderBar from '../../layout/header/HeaderBar';

import { ImArrowLeft2 } from "react-icons/im";
import styles from './EditRepresentative.module.css'

const EditRepresentative = () => {
  return (
    <Fragment>
      <HeaderBar text="PAINEL DE CONTROLE" backPageIcon={<ImArrowLeft2 size={25} />} backPage="/users" />
      <div className={styles.edit_representative}>
        <section>
          <h3>Editar Representante</h3>
          <FormEditRepresentative />
        </section>
      </div>
    </Fragment>
  )
}

export default EditRepresentative;