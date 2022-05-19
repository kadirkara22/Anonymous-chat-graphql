import { useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import Loading from '../Loading'
import { CREATE_MESSAGE_MUTATION } from './queries'
import styles from './styles.module.css'
const MessageInput = ({ setNewMessage }) => {
    const [saveMessage, { loading }] = useMutation(CREATE_MESSAGE_MUTATION)

    const [text, setText] = useState('')


    const handleChange = (e) => {
        setText(e.target.value)
    }

    const handleSubmit = async () => {
        setText('')

        await saveMessage({
            variables: {
                message: { text },
            }
        })


    }
    useEffect(() => {
        const enterListener = (event) => {
            if (event.key === 'Enter') {
                handleSubmit()
            }
        }
        window.addEventListener('keyup', enterListener)
        return () => {
            window.removeEventListener('keyup', enterListener)
        }
    })
    if (loading) {
        return <Loading />
    }
    return (

        <form className={styles.messageInput} onSubmit={handleSubmit}>
            <input disabled={loading} type="text" name="text" onChange={handleChange} value={text} className={styles.sendMessage} />
            <button disabled={loading} type="submit" className={styles.messageButton}>Send</button>
        </form>

    )
}

export default MessageInput
