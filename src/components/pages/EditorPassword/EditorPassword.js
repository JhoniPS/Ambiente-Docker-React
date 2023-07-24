
import FormPassword from '../../formEditorPassword/FormPassword';
import styles from './EditorPassword.module.css'

const EditorProfile = () => {
  return (
    <div className={styles.Editor_password}>
      <section>
        <h4>Editar Senha</h4>
        <FormPassword />
      </section>
    </div>
  )
}

export default EditorProfile;