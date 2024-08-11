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
                            <p>안녕하세요? 항만공사 챗봇입니다!</p>
                            <p>무엇을 도와드릴까요?</p>
                            <p>키워드 입력보다는 대화형으로 문의하시면 더 잘 알려드릴 수 있어요!</p>
                        </div>
                    </div>
                    <div className="buttons-outside">
                        <div className="buttons-row">
                            <button onClick={() => handleButtonClick('facility')} className="wide-button">시설 예약</button>
                            <button onClick={() => handleButtonClick('cargo')} className="wide-button">화물 입·출항 신고</button>
                        </div>
                        <div className="buttons-row">
                            <button onClick={() => handleButtonClick('repair')}>수리 요청</button>
                            <button onClick={() => handleButtonClick('payment')}>요금 결제</button>
                            <button onClick={() => handleButtonClick('consult')}>고객 지원</button>
                        </div>
                    </div>
                    <div ref={chatEndRef} />
                </div>
            ) : (
                <div className={`chat-message ${isUser ? 'user' : 'bot'}`}>
                    {!isUser && (
                        <div className="bot-info">
                            <img src={botCharacter} alt="bot" className="bot-image" />
                        </div>
                    )}
                    <div className={`message-container ${isUser ? 'user' : 'bot'}`}>
                        {!isUser && (
                            <>
                                <div className="message-bubble">{message.text}</div>
                                <div className="timestamp bot-timestamp">{message.timestamp}</div>
                            </>
                        )}
                        {isUser && (
                            <>
                                <div className="timestamp user-timestamp">{message.timestamp}</div>
                                <div className="message-bubble">{message.text}</div>
                            </>
                        )}
                    </div>
                    <div ref={chatEndRef} />
                </div>
            )}
        </div>
    );
};

export default ChatMessage;
