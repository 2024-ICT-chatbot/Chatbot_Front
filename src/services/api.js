// src/services/api.js

/**
 * Fetches a response from the bot based on user input.
 * @param {string} userInput - The input text from the user.
 * @returns {Promise<string>} The bot's response or an error message.
 */
export const getBotResponse = async (userInput) => {
  const apiUrl = 'http://localhost:8000/api/v1/chat'; // API URL 설정을 상수로 추출

  try {
      const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: userInput }),
      });

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`); // 서버 상태 코드 체크
      }

      const data = await response.json();

      console.log(data); // 반환된 데이터 구조 확인용

      if (data.error) {
          return `Error: ${data.error}`; // 서버로부터 반환된 에러 처리
      }

      // 반환된 데이터에서 올바른 키를 사용하여 값을 가져옴
      return data.answer || data.response || '응답을 생성하는 중 오류가 발생했습니다. 다시 시도해주세요.';
  } catch (error) {
      console.error('Error fetching response from FastAPI server:', error);
      return '응답을 생성하는 중 오류가 발생, 다시 시도해주세요.'; // 네트워크 에러 또는 기타 예외 처리
  }
};

