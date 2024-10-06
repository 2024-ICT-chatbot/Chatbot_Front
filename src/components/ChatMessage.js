import React, { useEffect, useRef } from 'react';
import './ChatMessage.css';
import botCharacter from '../assets/images/bot_character.png';
import harborImage from '../assets/images/항만.png';
import imformation from '../assets/images/기타정보.png';
import fee from '../assets/images/요금결제.png';
import support from '../assets/images/고객지원.png';
import serviceIntro from '../assets/images/service_intro.png';

// 줄바꿈 문자를 <br>로 변환하는 함수
const convertTextWithLineBreaks = (text) => {
    return text.split('\n').map((part, index) => (
        <React.Fragment key={index}>
            {part}
            <br />
        </React.Fragment>
    ));
};

// URL을 감지하고 링크로 변환하는 함수
const convertTextToLinks = (text) => {
    const urlPattern = /(https?:\/\/[^\s]+)/g;
    return text.split(urlPattern).map((part, index) => {
        if (urlPattern.test(part)) {
            return (
                <a key={index} href={part} target="_blank" rel="noopener noreferrer" className="chat-link">
                    {part}
                </a>
            );
        } else {
            return convertTextWithLineBreaks(part); // 줄바꿈 변환 적용
        }
    });
};

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
                                    <div>항만 입/출항 신고</div>
                                </div>
                            </button>
                            <button onClick={() => handleButtonClick('payment')} className="wide-button">
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <img src={fee} alt="요금결제" style={{ width: '40px', height: '40px', marginBottom: '8px' }} />
                                    <div>항만시설사용료</div>
                                </div>
                            </button>
                            <button onClick={() => handleButtonClick('support')} className="wide-button">
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <img src={support} alt="고객지원" style={{ width: '40px', height: '40px', marginBottom: '8px' }} />
                                    <div>고객 지원</div>
                                </div>
                            </button>
                        </div>
                        <div className="buttons-row">
                            <button onClick={() => handleButtonClick('info')} className="wide-button">
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <img src={imformation} alt="기타정보" style={{ width: '40px', height: '40px', marginBottom: '8px' }} />
                                    <div>기타 정보</div>
                                </div>
                            </button>
                            <button onClick={() => handleButtonClick('service_intro')} className="wide-button">
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <img src={serviceIntro} alt="서비스 소개" style={{ width: '40px', height: '40px', marginBottom: '8px' }} />
                                    <div>서비스 소개</div>
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
                                <div className="message-bubble">
                                    {message.isIframe ? (
                                        <div dangerouslySetInnerHTML={{ __html: message.text }} />
                                    ) : (
                                        Array.isArray(message.text) ? (
                                            message.text.map((line, index) => <p key={index}>{convertTextToLinks(line)}</p>)
                                        ) : (
                                            convertTextToLinks(message.text)
                                        )
                                    )}
                                </div>
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
                            <div className="message-bubble">{convertTextToLinks(message.text)}</div>
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
