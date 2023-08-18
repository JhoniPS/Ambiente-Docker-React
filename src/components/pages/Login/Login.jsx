
import styles from './Login.module.css'
import Form from '../../Forms/formLogin/Form';
import img from '../../../img/BrasãoUfopa.png'

const Login = () => {
    return (
        <div className={styles.login}>
            <section>
                <img src={img} alt='Logo da UFOPA'/>
                <h4>Documentos e Comissões</h4>
                <h5>Seja bem vindo(a)!</h5>
                <p>Digite seu e-mail institucional e a senha para efetuar o login.</p>
                <Form />
            </section>
        </div>
    );
};

export default Login;