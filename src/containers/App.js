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

      // 정해진 옵션 리스트에 따라 API 호출
      if ([
        '항만 입/출항 신고 절차', '화물 입/출항 신고 절차', '사용료 안내', '요금 결제 방법 안내',
        '여객 운항 정보', '유실물 센터', '수리 요청/시설물 유지보수 신고', '방문 예약',
        '채용 정보', '빅데이터 분석 시스템', '체인포털', '공모 서비스'
      ].includes(infoType)) {
        try {
          const response = await axios.post('http://localhost:8000/api/v1/get-info', { infoType });
          const botResponse = response.data;

          newMessages = [
            ...messages,
            {
              type: 'bot',
              text: botResponse.message,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
              options: botResponse.options || [],
            },
          ];
        } catch (error) {
          console.error('Error fetching data from backend:', error);

          newMessages = [
            ...messages,
            {
              type: 'bot',
              text: '오류가 발생했습니다. 다시 시도해주세요.',
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
            },
          ];
        }
      } else {
        // 기본적인 옵션을 처리하는 부분
        if (infoType === 'cargo') {
          newMessages = [
            ...messages,
            {
              type: 'bot',
              text: '입출항 신고를 선택하셨습니다. 다음 작업을 선택해주세요.',
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
              options: ['항만 입/출항 신고 절차', '화물 입/출항 신고 절차'],
            },
          ];
        } else if (infoType === 'payment') {
          newMessages = [
            ...messages,
            {
              type: 'bot',
              text: '요금 결제를 선택하셨습니다. 다음 작업을 선택해주세요.',
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
              options: ['사용료 안내', '요금 결제 방법 안내'],
            },
          ];
        } else if (infoType === 'support') {
          newMessages = [
            ...messages,
            {
              type: 'bot',
              text: '고객 지원을 선택하셨습니다. 다음 작업을 선택해주세요.',
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
              options: ['여객 운항 정보', '유실물 센터', '수리 요청/시설물 유지보수 신고', '방문 예약'],
            },
          ];
        } else if (infoType === 'info') {
          newMessages = [
            ...messages,
            {
              type: 'bot',
              text: '기타 정보를 선택하셨습니다. 다음 작업을 선택해주세요.',
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
              options: ['채용 정보', '빅데이터 분석 시스템', '체인포털', '공모 서비스'],
            },
          ];
        }
      }

      setMessages(newMessages);
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