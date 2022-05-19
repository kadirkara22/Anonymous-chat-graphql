import { useQuery, useSubscription } from '@apollo/client';
import React, { useEffect } from 'react'
import Loading from '../Loading';
import MessageInput from '../MessageInput'
import Messages from '../Messages'
import { GET_MESSAGES, MESSAGES_SUBSCRIPTION } from './queries';
import styles from './styles.module.css'
const Chat = () => {
    const { loading, error, data, subscribeToMore } = useQuery(GET_MESSAGES);

    /* useEffect(() => {""

        subscribeToMore({
            document: MESSAGES_SUBSCRIPTION,
            onError: err => console.error(err),
            updateQuery: (prev, { subscriptionData }) => {
                console.log(prev, "prev")
                console.log(subscriptionData, "subscriptionData")

            }

        })

    }, [subscribeToMore]) */


    if (loading) {
        return <Loading />
    }

    console.log(data.messages)

    return (
        <div className={styles.chatPage}>

            <div className={styles.messages}>
                <Messages messages={data?.messages} />

            </div>
            <div className={styles.messageInput}>
                <MessageInput />

            </div>
        </div>
    )
}

export default Chat
