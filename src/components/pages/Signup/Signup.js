import Form from '../../formSignup/Form';
import styles from './Signup.module.css'

const Signup = () => {
    return (
        <div className={styles.signup}>
            <h1>Cadastro de Usuarios</h1>
            <Form />
        </div>
    );
};

export default Signup;