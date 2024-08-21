import React, { useEffect, useRef } from 'react';
import './ChatMessage.css';
import botCharacter from '../assets/images/bot_character.png';
import harborImage from '../assets/images/항만.png';
import imformation from '../assets/images/기타정보.png';  // 추가된 이미지 import
import fee from '../assets/images/요금결제.png';        // 추가된 이미지 import
import support from '../assets/images/고객지원.png';    // 추가된 이미지 import

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
                        <div className="timestamp bot-timestamp">{message.timestamp}</div>
                    </div>
                    <div className="buttons-outside">
                        <div className="buttons-row">
                            <button onClick={() => handleButtonClick('cargo')} className="wide-button">
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <img src={harborImage} alt="항만" style={{ width: '40px', height: '40px', marginBottom: '8px' }} />
                                    <div>입/출항 신고</div>
                                </div>
                            </button>
                            <button onClick={() => handleButtonClick('payment')} className="wide-button">
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <img src={fee} alt="요금결제" style={{ width: '40px', height: '40px', marginBottom: '8px' }} />
                                    <div>요금 결제</div>
                                </div>
                            </button>
                        </div>
                        <div className="buttons-row">
                            <button onClick={() => handleButtonClick('support')} className="wide-button">
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <img src={support} alt="고객지원" style={{ width: '40px', height: '40px', marginBottom: '8px' }} />
                                    <div>고객 지원</div>
                                </div>
                            </button>
                            <button onClick={() => handleButtonClick('info')} className="wide-button">
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <img src={imformation} alt="기타정보" style={{ width: '40px', height: '40px', marginBottom: '8px' }} />
                                    <div>기타 정보/서비스</div>
                                </div>
                            </button>
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
                                            <button onClick={() => handleButtonClick(option)} className="option-button">
                                                {option}
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
