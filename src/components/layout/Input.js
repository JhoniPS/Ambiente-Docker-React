import styles from './Input.module.css'

function Input({ type, text, name, placeholder, OnChange, value }) {
   return (
      <div className={styles.input_control}>
         <label htmlFor={name}>{text}:</label>
         <input
            type={type}
            name={name}
            id={name}
            placeholder={placeholder}
            onChange={OnChange}
            value={value}
         />
      </div>
   );
}

export default Input;