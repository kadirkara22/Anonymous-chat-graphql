import React from 'react'
import styles from './styles.module.css'
const Message = ({ messages }) => {

    return (
        <div className={styles.messageContainer}>
            {

                messages && messages.map((item, i) =>
                    <span className={styles.message}
                        key={i}>
                        <span className={styles.green}>{item.text}</span>
                    </span>
                )
            }
        </div>
    )
}

export default Message
