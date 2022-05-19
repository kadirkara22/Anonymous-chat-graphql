import React from 'react'
import styles from './styles.module.css'
const MessageInput = () => {
    return (
        <div className={styles.messageInput}>
            <input className={styles.sendMessage}></input>
            <button className={styles.messageButton}>Send</button>
        </div>
    )
}

export default MessageInput
