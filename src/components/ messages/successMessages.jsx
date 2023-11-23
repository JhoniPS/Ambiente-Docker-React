import React from 'react'
import style from './successMessages.module.css'

function successMessages({ text }) {
    return (
        <div className={style.container}>{text}<span>X</span></div>
    );
}

export default successMessages;