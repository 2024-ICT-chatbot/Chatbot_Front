import React, { useState, useEffect } from 'react';
import ChatMessage from '../components/ChatMessage';
import '../containers/App.css';
import axios from 'axios';

// getBotResponse 함수 정의
export const getBotResponse = async (message) => {
  try {
    const response = await axios.post('http://localhost:8000/chat', { message });
    return response.data.response;
  } catch (error) {
    console.error('Error fetching bot response:', error);
    return '오류가 발생했습니다. 다시 시도해주세요.';
  }
};

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  // 페이지 로드 시 웰컴 메시지 추가
  useEffect(() => {
    const welcomeMessage = {
      type: 'bot',
      text: ['안녕하세요? 항만공사 챗봇입니다.', '무엇을 도와드릴까요?'],
      isWelcome: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
    };
    setMessages([welcomeMessage]);
  }, []);

  // 버튼 클릭 시 발생하는 이벤트 처리
  const handleButtonClick = (infoType) => {
    let info = '';
    switch (infoType) {
      case 'facility':
        info = '시설 예약: 시설 예약 정보입니다.';
        break;
      case 'cargo':
        info = '화물입·출항 신고 수리: 화물입·출항 신고 수리 정보입니다.';
        break;
      case 'repair':
        info = '수리 요청: 수리 요청 정보입니다.';
        break;
      case 'payment':
        info = '요금 결제: 요금 결제 정보입니다.';
        break;
      case 'consult':
        info = '상담 접수: 상담 접수 정보입니다.';
        break;
      default:
        info = '';
    }

    const newMessages = [...messages, { type: 'bot', text: info, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) }];
    setMessages(newMessages);
  };

  // 메시지 전송 처리
  const handleSend = async () => {
    if (input.trim() !== '') {
      const userMessage = {
        type: 'user',
        text: input,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
      };
      setMessages([...messages, userMessage]);
      setInput('');

      const botResponse = await getBotResponse(input);
      const botMessage = {
        type: 'bot',
        text: botResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }
  };

  // Enter 키 입력 시 메시지 전송
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot">
        {/* 헤더를 최상단에 고정 */}
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
