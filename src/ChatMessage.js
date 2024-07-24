import React, { useEffect, useRef } from 'react';
import './ChatMessage.css';
import botCharacter from './bot_character.png';

const ChatMessage = ({ message, handleButtonClick }) => {
    const isUser = message.type === 'user';
    const chatEndRef = useRef(null);

    // 새로운 메시지가 추가될 때마다 스크롤을 최하단으로 이동
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [message]);

    if (message.isWelcome) {
        return (
            <div>
                <div className="bot-header">
                    {/* 챗봇 이미지와 이름 */}
                    <img src={botCharacter} alt="bot" className="bot-image" />
                    <div className="bot-name">항만공사 챗봇</div>
                </div>
                <div className="welcome-box">
                    {/* 안내 메시지 */}
                    <div>안녕하세요? 항만공사 챗봇입니다!</div>
                    <div className="spacing" /> 
                    <div>무엇을 도와드릴까요?</div>
                    <div className="spacing" /> 
                    <div>키워드 입력보다는 대화형으로 문의하시면 더 잘 알려드릴 수 있어요!</div>
                    {/* 메시지와 버튼 사이의 간격을 위한 div 추가 */}
                    <div className="spacing" /> 
                    <div className="buttons">
                        {/* 버튼들 */}
                        <button onClick={() => handleButtonClick('facility')}>시설 예약</button>
                        <button onClick={() => handleButtonClick('cargo')}>화물 입·출항 신고</button>
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
                    {/* 챗봇 이미지 */}
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
