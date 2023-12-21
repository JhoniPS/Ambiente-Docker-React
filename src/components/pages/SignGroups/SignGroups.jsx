
import styles from './SignGroups.module.css';

import HeaderBar from '../../layout/header/HeaderBar';
import { ImArrowLeft2 } from "react-icons/im";
import { Fragment } from 'react';
import StepGroupRegister from '../../steps/StepGroupRegister'

const SignGroups = () => {
  return (
    <Fragment>
      <HeaderBar text="PAINEL DE CONTROLE" backPageIcon={<ImArrowLeft2 size={25} />} backPage="/gerente" />
      <div className={styles.sign_groups}>
        <section className={styles.section_group}>
          <StepGroupRegister />
        </section>
      </div>
    </Fragment>
  )
}

export default SignGroups;