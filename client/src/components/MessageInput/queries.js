import { gql } from '@apollo/client';
export const CREATE_MESSAGE_MUTATION = gql`
mutation ($message:CreateMessageInput!){
  createMessage(message:$message) {
    text
    userID
  }
}
`;