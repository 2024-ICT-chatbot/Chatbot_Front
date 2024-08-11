export const getBotResponse = async (userInput) => {
    try {
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput }),
      });
  
      const data = await response.json();
      if (data.error) {
        return `Error: ${data.error}`;
      }
      return data.response;
    } catch (error) {
      console.error('Error fetching response from FastAPI server:', error);
      return '응답을 생성하는 중 오류가 발생했습니다. 다시 시도해주세요.';
    }
  };
  