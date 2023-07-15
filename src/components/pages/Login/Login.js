
import styles from './Login.module.css'
import Form from '../../formLogin/Form';

const Login = () => {
    return (
        <div className={styles.login}>
            <h2>Login do Sistema</h2>
            <section>
                <Form />
            </section>
        </div>
    );
};

export default Login;