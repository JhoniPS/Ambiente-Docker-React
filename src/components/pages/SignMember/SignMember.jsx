
import styles from './SignMember.module.css';

import HeaderBar from '../../layout/header/HeaderBar';
import { ImArrowLeft2 } from "react-icons/im";
import { Fragment } from 'react';
import { useParams } from "react-router-dom";
import StepAddMember from '../../steps/StepAddMember';

const SignMember = () => {
  const { id } = useParams();
  
  return (
    <Fragment>
      <HeaderBar text="PAINEL DE CONTROLE" backPageIcon={<ImArrowLeft2 size={25} />} backPage={`/detalhes-de-grupos-representante/${id}/`} />
      <div className={styles.sign_member}>
        <section className={styles.section_member}>
          <StepAddMember/>
        </section>
      </div>
    </Fragment>
  )
}

export default SignMember;