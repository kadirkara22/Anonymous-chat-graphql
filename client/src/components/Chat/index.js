import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import Loading from '../Loading';
import MessageInput from '../MessageInput'
import Messages from '../Messages'
import { GET_MESSAGES, MESSAGES_SUBSCRIPTION } from './queries';
import styles from './styles.module.css'


const Chat = () => {
    const [newMessage, setNewMessage] = useState("");
    const { loading, data } = useQuery(GET_MESSAGES);


    if (loading) {
        return <Loading />
    }



    return (
        <div className={styles.chatPage}>

            <div className={styles.messages}>
                <Messages messages={data?.messages} newMessage={newMessage} />

            </div>
            <div className={styles.messageInput}>
                <MessageInput setNewMessage={setNewMessage} />

            </div>
        </div>
    )
}

export default Chat
