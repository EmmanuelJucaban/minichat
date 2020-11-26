import {useState, useEffect} from 'react';
import io from 'socket.io-client';

const socket = io();

function App() {
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    socket.on('serverToClientMessageSent', (chatArr) => {
      console.log(chatArr);
      setChatMessages(chatArr);
    });

    socket.on('helloWorld', (string) => {
      console.log(string);
    });

    socket.on('yee', (string) => {
      console.log(string);
    });

    socket.emit('clientToServerFetchMessages', messages => {
      setChatMessages(messages);
    });

    return function () {
      console.log('Im leaving');
      socket.removeListener('serverToClientMessageSent');
      socket.removeListener('yee');
      socket.removeListener('helloWorld');
    }
  }, []);

  const submitChat = () => {
    socket.emit('clientToServerMessageSent', chatInput);
    setChatInput('');
  };

  const renderMessages = () => {
    return chatMessages?.map((chat, index) => {
      return <li key={index}>{chat}</li>
    });
  };


  return (
    <div className="App">
      <input
        onChange={(e) => setChatInput(e.target.value)}
        value={chatInput}
      />
      <button onClick={submitChat}>
        Submit
      </button>
      <ul>
        {renderMessages()}
      </ul>
    </div>
  );
}

export default App;
