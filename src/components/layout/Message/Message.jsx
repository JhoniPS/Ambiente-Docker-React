import React, { Fragment, useEffect, useState } from 'react'
import { AiOutlineClose } from "react-icons/ai";
import style from './Message.module.css'

function Message({ type, msg }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!msg) {
            setVisible(false);
            return;
        }

        setVisible(true);

        const timer = setTimeout(() => {
            setVisible(false);
        }, 3000);

        return () => clearTimeout(timer);

    }, [msg]);

    return (
        <Fragment>
            {visible && (
                <div className={`${style.message} ${style[type]}`}>{msg}<AiOutlineClose onClick={() => setVisible(false)} size={25} /></div>
            )}
        </Fragment>
    )
}

export default Message;