import React, { useEffect, useRef } from 'react'
import Message from '../Message'
import styles from './styles.module.css'
const Messages = ({ messages }) => {


    return (
        <div className={styles.messages}>
            <Message messages={messages} />
        </div>
    )
}

export default Messages
