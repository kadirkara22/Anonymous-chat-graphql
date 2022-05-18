import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: 'http://127.0.0.1:4000/graphql?query=mutation+createMessage%7B%0A++createMessage%28message%3A%7Btext%3A%22nerdesin%22%7D%29+%7B%0A++++text%0A++++userID%0A++%7D%0A%7D',
    cache: new InMemoryCache()
});
export default client;