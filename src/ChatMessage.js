import React, { useEffect, useRef } from 'react';
import './ChatMessage.css';
import botCharacter from './bot_character.png';

const ChatMessage = ({ message, handleButtonClick }) => {
    const isUser = message.type === 'user';
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [message]);

    if (message.isWelcome) {
        return (
            <div>
                <div className="bot-header">
                    <img src={botCharacter} alt="bot" className="bot-image" />
                    <div className="bot-name">항만공사 챗봇</div>
                </div>
                <div className="welcome-box">
                    <div className="welcome-message">
                        {message.text.map((line, index) => (
                            <div key={index} className="welcome-message-line">{line}</div>
                        ))}
                    </div>
                    <div className="buttons">
                        <button onClick={() => handleButtonClick('facility')}>시설 예약</button>
                        <button onClick={() => handleButtonClick('cargo')}>화물입·출항 신고 수리</button>
                        <button onClick={() => handleButtonClick('repair')}>수리 요청</button>
                        <button onClick={() => handleButtonClick('payment')}>요금 결제</button>
                        <button onClick={() => handleButtonClick('consult')}>상담 접수</button>
                    </div>
                </div>
                <div ref={chatEndRef} />
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
                {Array.isArray(message.text) ? message.text.map((line, index) => (
                    <p key={index}>{line}</p>
                )) : <p>{message.text}</p>}
            </div>
            <div ref={chatEndRef} />
        </div>
    );
};

export default ChatMessage;
