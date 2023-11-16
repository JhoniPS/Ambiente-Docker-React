
import styles from './SignMember.module.css';

import HeaderBar from '../../layout/header/HeaderBar';
import { ImArrowLeft2 } from "react-icons/im";
import { Fragment } from 'react';
import StepAddMember from '../../steps/StepAddMember';

const SignMember = () => {
  return (
    <Fragment>
      <HeaderBar text="PAINEL DE CONTROLE" backPageIcon={<ImArrowLeft2 size={25} />} backPage="/detalhes-de-grupos-representante" />
      <div className={styles.sign_member}>
        <section className={styles.section_member}>
          <StepAddMember/>
        </section>
      </div>
    </Fragment>
  )
}

export default SignMember;