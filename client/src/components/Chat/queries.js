import { gql } from '@apollo/client';
export const GET_MESSAGES = gql`
query  {
  messages {
    userID
    text
  }
}
`;
export const MESSAGES_SUBSCRIPTION = gql`
subscription {
messages {
   text
    userID
  }
}
`;