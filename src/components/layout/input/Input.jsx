import styles from './Input.module.css'

function Input({ type, text, name, placeholder, OnChange, value, error }) {
   return (
      <div className={styles.input_control}>
         <fieldset>
            <legend htmlFor={name}>{text}</legend>
            {error}
            <input
               type={type}
               name={name}
               id={name}
               placeholder={placeholder}
               onChange={OnChange}
               value={value}
            />
         </fieldset>
      </div>
   );
}

export default Input;