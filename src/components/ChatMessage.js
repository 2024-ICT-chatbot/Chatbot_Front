import React, { useEffect, useRef } from 'react';
import './ChatMessage.css';
import botCharacter from '../assets/images/bot_character.png';

const ChatMessage = ({ message, handleButtonClick }) => {
  const isUser = message.type === 'user';
  const chatEndRef = useRef(null);

  // 새로운 메시지가 추가될 때마다 스크롤을 최하단으로 이동
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [message]);

  return (
    <div className="chat-message-container">
      {message.isWelcome ? (
        <div className={`chat-message bot`}>
          <div className="bot-info">
            <img src={botCharacter} alt="bot" className="bot-image" />
          </div>
          <div className="message-container bot">
            <div className="message-bubble">
              {Array.isArray(message.text) ? (
                message.text.map((line, index) => <p key={index}>{line}</p>)
              ) : (
                <p>{message.text}</p>
              )}
            </div>
            <div className="timestamp bot-timestamp">{message.timestamp}</div>
          </div>
          <div className="buttons-outside">
            <div className="buttons-row">
              <button onClick={() => handleButtonClick('cargo')} className="wide-button">입/출항 신고</button>
              <button onClick={() => handleButtonClick('payment')} className="wide-button">요금 결제</button>
            </div>
            <div className="buttons-row">
              <button onClick={() => handleButtonClick('support')}>고객 지원</button>
              <button onClick={() => handleButtonClick('info')}>기타 정보/서비스</button>
            </div>
          </div>
          <div ref={chatEndRef} />
        </div>
      ) : (
        <div className={`chat-message ${isUser ? 'user' : 'bot'}`}>
          {!isUser && (
            <>
              <div className="bot-info">
                <img src={botCharacter} alt="bot" className="bot-image" />
              </div>
              <div className="message-container bot">
                <div className="message-bubble">{message.text}</div>
                <div className="timestamp bot-timestamp">{message.timestamp}</div>
              </div>
              {message.options && (
                <div className="additional-options">
                  {message.options.map((option, idx) => (
                    <div key={idx} className="option-wrapper">
                      <button onClick={() => handleButtonClick(option.id)} className="option-button">
                        {option.text}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
          {isUser && (
            <div className="message-container user">
              <div className="message-bubble">{message.text}</div>
              <div className="timestamp user-timestamp">{message.timestamp}</div>
            </div>
          )}
        </div>
      )}
      <div ref={chatEndRef} />
    </div>
  );
};

export default ChatMessage;
