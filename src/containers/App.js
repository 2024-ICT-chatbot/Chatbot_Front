import React, { useState, useEffect } from "react";
import ChatMessage from "../components/ChatMessage";
import "../containers/App.css";
import sendimage from "../assets/images/전송.png";
import axios from "axios";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const welcomeMessage = {
      type: "bot",
      text: ["안녕하세요? 항만공사 챗봇입니다.", "무엇을 도와드릴까요?"],
      isWelcome: true,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
    };
    setMessages([welcomeMessage]);
  }, []);

  const handleButtonClick = async (infoType) => {
    let newMessages = [...messages];

    // 정해진 옵션 리스트에 따라 API 호출
    if (
      [
        "외항선 입출항 수속 절차",
        "내항선 입출항 수속 절차",
        "PORT-MIS 교육자료",
        "선박료",
        "화물료",
        "항만시설 전용사용료",
        "항만시설 보안료",
        "임대료",
        "사용료 기타정보",
        "울산항만공사 선석운영지원시스템",
        "울산항 데이터통합플랫폼 PortWise",
        "방문 예약",
        "선박입·출항신고 수리",
        "선석운영 협의회 운영",
        "항만시설 사용실적 관리",
        "화물료 고지",
        "항만시설 사용신청 및 승낙",
        "채용 정보",
        "대국민 공모 신청",
      ].includes(infoType)
    ) {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/v1/get-info",
          null,
          {
            params: {
              button_name: infoType,
            },
          }
        );
        const botResponse = response.data;

        newMessages = [
          ...messages,
          {
            type: "bot",
            text: botResponse.message,
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }),
            options: botResponse.options || [],
          },
        ];
      } catch (error) {
        console.error("Error fetching data from backend:", error);

        newMessages = [
          ...messages,
          {
            type: "bot",
            text: "오류가 발생했습니다. 다시 시도해주세요.",
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }),
          },
        ];
      }
    } else {
      // 기본적인 옵션을 처리하는 부분
      if (infoType === "cargo") {
        newMessages = [
          ...messages,
          {
            type: "bot",
            text: "항만 입출항 신고를 선택하셨습니다. 다음 작업을 선택해주세요.",
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }),
            options: [
              "외항선 입출항 수속 절차",
              "내항선 입출항 수속 절차",
              "PORT-MIS 교육자료",
            ],
          },
        ];
      } else if (infoType === "payment") {
        newMessages = [
          ...messages,
          {
            type: "bot",
            text: "항만시설사용료를 선택하셨습니다. 다음 작업을 선택해주세요.",
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }),
            options: [
              "항만시설사용료의 종류 및 징수대상시설",
              "사용료 기타정보",
            ],
          },
        ];
      } else if (infoType === "항만시설사용료의 종류 및 징수대상시설") {
        newMessages = [
          ...messages,
          {
            type: "bot",
            text: "항만시설사용료의 종류 및 징수대상시설에 대해 알아보겠습니다. 세부 항목을 선택해주세요.",
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }),
            options: [
              "선박료",
              "화물료",
              "항만시설 전용사용료",
              "항만시설 보안료",
              "임대료",
            ],
          },
        ];
      } else if (infoType === "support") {
        newMessages = [
          ...messages,
          {
            type: "bot",
            text: "고객 지원을 선택하셨습니다. 다음 작업을 선택해주세요.",
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }),
            options: [
              "울산항만공사 선석운영지원시스템",
              "울산항 데이터통합플랫폼 PortWise",
              "방문 예약",
            ],
          },
        ];
      } else if (infoType === "service_intro") {
        newMessages = [
          ...messages,
          {
            type: "bot",
            text: "울산항만공사에서 제공하는 서비스 목록입니다. 다음 작업을 선택해주세요.",
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }),
            options: [
              "선박입·출항신고 수리",
              "선석운영 협의회 운영",
              "항만시설 사용실적 관리",
              "화물료 고지",
              "항만시설 사용신청 및 승낙",
            ],
          },
        ];
      } else if (infoType === "info") {
        newMessages = [
          ...messages,
          {
            type: "bot",
            text: "기타 정보를 선택하셨습니다. 다음 작업을 선택해주세요.",
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }),
            options: ["채용 정보", "대국민 공모 신청"],
          },
        ];
      } else if (infoType === "방문 예약") {
        // '방문 예약' 클릭 시 index.html로 이동하는 메시지를 추가합니다.
        newMessages = [
          ...messages,
          {
            type: "bot",
            text: "대국민 공모서비스에 접수하기 위해서는 아래 사이트에 접속해 접수해주기바랍니다.",
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }),
            options: [],
            link: "https://port.com/contest-entry", // /contest-entry로 설정
          },
        ];
      }
    }

    setMessages(newMessages);
  };

  const handleSend = async () => {
    if (input.trim() !== "") {
      const userMessage = {
        type: "user",
        text: input,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      };
      setMessages([...messages, userMessage]);
      setInput("");

      try {
        const botResponse = await axios.post(
          "http://localhost:8000/api/v1/chat",
          { message: input }
        );
        const botMessage = {
          type: "bot",
          text: botResponse.data.answer, // response가 아닌 answer를 사용
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }),
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (error) {
        console.error("Error fetching bot response:", error);
        const errorMessage = {
          type: "bot",
          text: "오류가 발생했습니다. 다시 시도해주세요.",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }),
        };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
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
              <ChatMessage
                key={index}
                message={msg}
                handleButtonClick={handleButtonClick}
              />
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
          <button onClick={handleSend} className="send-button">
            <img
              src={sendimage}
              alt="전송"
              style={{
                width: "24px",
                height: "22px",
                position: "relative",
                top: "-6px",
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
