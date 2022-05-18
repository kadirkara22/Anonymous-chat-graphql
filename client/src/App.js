import { gql, useQuery } from '@apollo/client';
import Chat from './components/Chat';
import Loading from './components/Loading';


const GET_MESSAGES = gql`
query  {
  messages {
    userID
    text
  }
}
`;

function App() {

  const { loading, error, data } = useQuery(GET_MESSAGES);

  if (loading) {
    return <Loading />
  }
  console.log(data.messages)
  return (
    <div className="App">
      {
        data && data.messages.map(item => <div key={item.userID}>{item.text}</div>)
      }
      <Chat />
    </div>
  );
}

export default App;
