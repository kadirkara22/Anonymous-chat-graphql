const { createServer, createPubSub, pipe } = require('@graphql-yoga/node')
const { nanoid } = require('nanoid')

const messages = []


const typeDefs = `
type Message {
  userID: ID!
  text:String!
}

type Query{
    messages:[Message!]
}
input CreateMessageInput {
    text: String!
  }
type Mutation {
    createMessage(message: CreateMessageInput!): Message!
}

type Subscription {
    createdMessage: [Message!]
}

`
const resolvers = {
    Query: {
        messages: (_, _args, { messages }) => messages,

    },
    Mutation: {
        createMessage: (_, { message }, { messages, pubsub }) => {
            const newMessage = { userID: nanoid(), ...message }
            messages.push(newMessage)
            pubsub.publish('createdMessage', { createdMessage: newMessage })
            return newMessage

        }
    },
    Subscription: {
        createdMessage: {
            async *subscribe(_, __, { messages, pubsub }) {
                pubsub.subscribe('createdMessage', { createdMessage: messages })
                console.log(messages)
            },
            resolve: (payload) => payload,
        }
    }
}


const pubsub = createPubSub()
// Create your server
const server = createServer({
    schema: {
        typeDefs,
        resolvers
    },
    context: {
        pubsub,
        messages
    }

})
// start the server and explore http://localhost:4000/graphql
server.start()