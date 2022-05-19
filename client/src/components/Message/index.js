import React from 'react'
import styles from './styles.module.css'
const Message = ({ messages }) => {
    return (
        <div className={styles.messageContainer}>
            {
                messages && messages.map(item =>
                    <span className={styles.message} key={item.userID}>
                        {item.text}
                    </span>
                )
            }
        </div>
    )
}

export default Message
