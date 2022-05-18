import { createServer, createPubSub, pipe, Repeater, map } from '@graphql-yoga/node'
import { nanoid } from 'nanoid'
//import pubsub from './pubsub'
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
    messages: [Message!]
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
            pubsub.publish('messages:change')
            return newMessage

        }
    },
    Subscription: {
        messages: {
            subscribe: (_, __, { pubsub }) =>
                pipe(
                    Repeater.merge([
                        // cause an initial event so the
                        // globalCounter is streamed to the client
                        // upon initiating the subscription
                        undefined,
                        // event stream for future updates
                        pubsub.subscribe('messages:change'),
                    ]),
                    // map all stream values to the latest globalCounter
                    map(() => messages),
                ),
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