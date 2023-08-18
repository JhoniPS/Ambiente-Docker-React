

import styles from './SignRepresentative.module.css'

import FormSignRepresentative from '../../Forms/formSignRepresentative/FormSignRepresentative';
import HeaderBar from '../../layout/header/HeaderBar';
import { ImArrowLeft2 } from "react-icons/im";
import { Fragment } from 'react';

const SignRepresentative = () => {
  return (
    <Fragment>
      <HeaderBar text="PAINEL DE CONTROLE" backPageIcon={<ImArrowLeft2 size={25} />} backPage="/representantes" />
      <div className={styles.sign_representative}>
        <section>
          <h3>Cadastrar Representante</h3>
          <FormSignRepresentative />
        </section>
      </div>
    </Fragment>
  )
}

export default SignRepresentative;