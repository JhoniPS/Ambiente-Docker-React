
import styles from './Login.module.css'
import LinkButton from '../../layout/LinkButton'
import Form from '../../formLogin/Form';

const Login = () => {
    return (
        <div className={styles.login}>
            <h1>Login do Sistema</h1>
            <section>
                <Form />
                <LinkButton to="/Signup" text="Cadastre-se" />
            </section>
        </div>
    );
};

export default Login;