import FormProfile from '../../Forms/formProfile/FormProfile'
import styles from './EditorProfile.module.css'

const EditorProfile = () => {
  return (
    <div className={styles.Editor_profile}>
      <section>
        <h4>Editar Perfil</h4>
        <FormProfile />
      </section>
    </div>
  )
}

export default EditorProfile;