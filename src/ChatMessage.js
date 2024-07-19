import React from 'react';
import './ChatMessage.css';
import botCharacter from './bot_character.png';  // 이미지 파일 불러오기

const ChatMessage = ({ message, handleButtonClick }) => {
    const isUser = message.type === 'user';  // 메시지 타입이 사용자 메시지인지 확인

    if (message.isWelcome) {
        return (
            <div className="welcome-box">
                <div className="welcome-message">
                    <img src={botCharacter} alt="bot" className="bot-image" />
                    <div className="bot-name">항만공사 챗봇</div>
                    <div className="bot-message">{message.text}</div>
                </div>
                <div className="buttons">
                    <button onClick={() => handleButtonClick('facility')}>시설 예약</button>
                    <button onClick={() => handleButtonClick('cargo')}>화물입·출항 신고 수리</button>
                    <button onClick={() => handleButtonClick('repair')}>수리 요청</button>
                    <button onClick={() => handleButtonClick('payment')}>요금 결제</button>
                    <button onClick={() => handleButtonClick('consult')}>상담 접수</button>
                </div>
            </div>
        );
    }

    return (
        <div className={`chat-message ${isUser ? 'user' : 'bot'}`}>
            {!isUser && (
                <div className="bot-info">
                    <img src={botCharacter} alt="bot" className="bot-image" /> 
                </div>
            )}
            <div className={`message-bubble ${isUser ? 'user' : 'bot'}`}>
                <p>{message.text}</p>
            </div>
        </div>
    );
};

export default ChatMessage;
