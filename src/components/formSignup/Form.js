import styles from './Form.module.css'
import Input from '../layout/Input'
import SubmitButton from '../layout/SubmitButton'
import LinkButton from '../layout/LinkButton'
import { useContext, useState } from 'react'
import { AuthContext } from '../contexts/Auth'

const Form = () => {
    const { signup } = useContext(AuthContext)

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [office, setOffice] = useState("");
    const [authEmail, setAuthEmail] = useState("");

    const handleSignup = (e) => {
        e.preventDefault();
        console.log("Cadastro", { name, email, authEmail, password, office });
        signup(name, email, authEmail, password, office);
    };

    return (
        <section className={styles.section_form}>
            <form onSubmit={handleSignup}>
                <Input
                    text="Nome do usuário"
                    name="usuario"
                    placeholder="Digite o nome"
                    value={name}
                    OnChange={(e) => setName(e.target.value)}
                />

                <Input
                    text="E-mail"
                    name="e-mail"
                    value={email}
                    placeholder="Digite o seu e-mail"
                    OnChange={(e) => setEmail(e.target.value)}
                />

                <Input
                    text="Confirmação de e-mail"
                    name="confirmação"
                    placeholder="Confirmação de e-mail"
                    value={authEmail}
                    OnChange={(e) => setAuthEmail(e.target.value)}
                />

                <Input
                    text="Senha"
                    name="senha"
                    value={password}
                    placeholder="Digite a senha"
                    OnChange={(e) => setPassword(e.target.value)}
                />

                <Input
                    text="Cargo"
                    name="cargo"
                    value={office}
                    placeholder="Digite o cargo"
                    OnChange={(e) => setOffice(e.target.value)}
                />

                <SubmitButton text="Cadastra-se" />
            </form>
            <p>Já é cadastrado? <LinkButton to="/login" text="Login" /></p>
        </section>
    )
};

export default Form;