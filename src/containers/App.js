// App.js에서 수정을 확인할 부분
import React, { useState, useEffect } from 'react';
import ChatMessage from '../components/ChatMessage';
import '../containers/App.css';
import axios from 'axios';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const welcomeMessage = {
      type: 'bot',
      text: ['안녕하세요? 항만공사 챗봇입니다.', '무엇을 도와드릴까요?'],
      isWelcome: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
    };
    setMessages([welcomeMessage]);
  }, []);

  const handleButtonClick = async (infoType) => {
    let newMessages = [...messages];

    if (infoType === 'cargo' || infoType === 'payment') {
      const options = {
        type: 'bot',
        text: infoType === 'cargo' ? '입출항 신고를 선택하셨습니다.' : '요금 결제를 선택하셨습니다.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
        options: infoType === 'cargo' ? [
          { id: 4, text: '항만 입/출항 신고 절차' },
          { id: 5, text: '화물 입/출항 신고 절차' }
        ] : [
          { id: 1, text: '사용료 안내' },
          { id: 2, text: '요금 결제 방법 안내' }
        ],
      };
      newMessages.push(options);
      setMessages(newMessages);
    } else {
      try {
        const response = await axios.get(`http://localhost:8000/get-button-response/${infoType}`);
        const botMessage = {
          type: 'bot',
          text: response.data.response,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
        };
        newMessages.push(botMessage);
        setMessages(newMessages);
      } catch (error) {
        console.error('Error fetching data from backend:', error);
        const errorMessage = {
          type: 'bot',
          text: '오류가 발생했습니다. 다시 시도해주세요.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
        };
        newMessages.push(errorMessage);
        setMessages(newMessages);
      }
    }
  };

  const handleSend = async () => {
    if (input.trim() !== '') {
      const userMessage = {
        type: 'user',
        text: input,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
      };
      setMessages([...messages, userMessage]);
      setInput('');

      try {
        const botResponse = await axios.post('http://localhost:8000/api/v1/chat', { message: input });
        const botMessage = {
          type: 'bot',
          text: botResponse.data.answer,  // response가 아닌 answer를 사용
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (error) {
        console.error('Error fetching bot response:', error);
        const errorMessage = {
          type: 'bot',
          text: '오류가 발생했습니다. 다시 시도해주세요.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
        };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot">
        <div className="header-text-container">
          <p className="header-text">항만공사 챗봇</p>
        </div>
        <div className="content-container">
          <div className="messages">
            {messages.map((msg, index) => (
              <ChatMessage key={index} message={msg} handleButtonClick={handleButtonClick} />
            ))}
          </div>
        </div>
        <div className="input-area">
          <input
            type="text"
            placeholder="내용을 입력하세요"
            className="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button onClick={handleSend} className="send-button">전송</button>
        </div>
      </div>
    </div>
  );
};

export default App;
