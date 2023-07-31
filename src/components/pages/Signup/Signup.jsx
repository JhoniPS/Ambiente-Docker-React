import Form from '../../formSignup/Form';
import styles from './Signup.module.css'

const Signup = () => {
    return (
        <div className={styles.signup}>
            <h2>Cadastro de Usuarios</h2>
            <Form />
        </div>
    );
};

export default Signup;