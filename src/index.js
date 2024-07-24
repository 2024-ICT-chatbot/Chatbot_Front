import React from 'react'; // React 라이브러리를 불러옴
import ReactDOM from 'react-dom/client'; // ReactDOM을 불러와 React 컴포넌트를 DOM에 렌더링
import './index.css'; // 공통 CSS 스타일을 불러옴
import App from './App'; // App 컴포넌트를 불러옴
import reportWebVitals from './reportWebVitals'; // 성능 측정 도구를 불러옴

// ReactDOM의 루트 엘리먼트를 생성하고, 해당 엘리먼트에 React 컴포넌트를 렌더링
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App /> {/* App 컴포넌트를 렌더링 */}
  </React.StrictMode>
);

// 애플리케이션의 성능을 측정하고 로그 결과를 출력하거나 분석 엔드포인트로 전송
// 예: reportWebVitals(console.log) 또는 분석 엔드포인트로 전송
reportWebVitals();
