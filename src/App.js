import React, { useState, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import './App.css';

const App = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        const welcomeMessage = {
            type: 'bot',
            text: '안녕하세요? 항만공사 챗봇입니다. 무엇을 도와드릴까요?',
            isWelcome: true
        };
        setMessages([welcomeMessage]);
    }, []);

    // 버튼 클릭 시 호출되는 함수
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

        const newMessages = [...messages, { type: 'bot', text: info }];
        setMessages(newMessages); // 새 메시지를 추가하여 상태 업데이트
    };

    // 메시지 전송 핸들러
    const handleSend = async () => {
        if (input.trim() !== '') {
            const newMessages = [...messages, { type: 'user', text: input }];
            setMessages(newMessages); // 사용자 메시지를 추가하여 상태 업데이트
            setInput(''); // 입력 필드 초기화

            const botResponse = await getBotResponse(input); // 봇 응답 가져오기
            setMessages((prevMessages) => [...prevMessages, botResponse]); // 봇 응답을 추가하여 상태 업데이트
        }
    };

    // Flask 서버에서 봇 응답을 가져오는 함수
    const getBotResponse = async (userInput) => {
        try {
            const response = await fetch('http://localhost:5000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: userInput }), // 사용자 입력을 서버로 전송
            });

            const data = await response.json();
            if (data.error) {
                return { type: 'bot', text: `Error: ${data.error}` }; // 오류 메시지 반환
            }
            return { type: 'bot', text: data.response }; // 봇 응답 메시지 반환
        } catch (error) {
            console.error('Error fetching response from Flask server:', error);
            return { type: 'bot', text: '응답을 생성하는 중 오류가 발생했습니다. 다시 시도해주세요.' }; // 예외 처리
        }
    };

    // Enter 키를 눌렀을 때 메시지를 전송하는 핸들러
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend(); // Enter 키 입력 시 메시지 전송
        }
    };

    return (
        <div className="chatbot-container">
            <div className="chatbot">
                {/* 채팅 메시지 표시 */}
                <div className="content-container">
                    <div className="messages">
                        {messages.map((msg, index) => (
                            <ChatMessage key={index} message={msg} handleButtonClick={handleButtonClick} />
                        ))}
                    </div>
                </div>
                {/* 메시지 입력 영역 */}
                <div className="input-area">
                    <input
                        type="text"
                        placeholder="내용을 입력하세요"
                        className="chat-input"
                        value={input}
                        onChange={(e) => setInput(e.target.value)} // 입력 필드 값 업데이트
                        onKeyPress={handleKeyPress} // Enter 키 입력 시 메시지 전송
                    />
                    <button onClick={handleSend} className="send-button">전송</button>
                </div>
            </div>
        </div>
    );
};

export default App;
