import HeaderBar from '../../layout/header/HeaderBar';
import FormSignTypeUser from '../../Forms/formSignTypeUser/FormSignTypeUser';

import styles from './SignTypeUser.module.css'
import { ImArrowLeft2 } from "react-icons/im";
import { Fragment } from 'react';

const SignTypeUser = () => {
  return (
    <Fragment>
      <HeaderBar
        text="PAINEL DE CONTROLE"
        backPageIcon={<ImArrowLeft2 size={25} />}
        backPage="/Tipos-de-Usuarios"
      />
      <div className={styles.sign_type_user}>
        <section>
          <h4>Cadastrar novo tipo</h4>
          <FormSignTypeUser />
        </section>
      </div>
    </Fragment>
  )
}

export default SignTypeUser;