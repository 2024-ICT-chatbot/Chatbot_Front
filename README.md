#프로젝트 아키텍처
-----

```
project-root
├── public                          // 정적 파일들을 저장하는 디렉토리 (favicon, index.html 등)
│   ├── favicon.ico
│   ├── index.html
│   └── ...
├── src
│   ├── assets                      // 프로젝트에서 사용하는 정적 파일들을 저장하는 디렉토리
│   │   ├── images                  // 이미지 파일들을 저장하는 디렉토리
│   │   │   └── bot_character.png   // 챗봇 캐릭터 이미지 파일
│   ├── components                  // 재사용 가능한 리액트 컴포넌트들을 저장하는 디렉토리
│   │   ├── ChatMessage.js          // 채팅 메시지 컴포넌트, 사용자와 봇의 메시지를 렌더링
│   │   ├── ChatMessage.css         // ChatMessage 컴포넌트의 스타일을 정의하는 CSS 파일
│   │   └── ...
│   ├── containers                  // 주로 상태를 관리하고, 컴포넌트들을 조합하는 역할을 하는 컨테이너 컴포넌트들을 저장하는 디렉토리
│   │   ├── App.js                  // 애플리케이션의 루트 컴포넌트, 전체 구조를 정의하고 메시지 상태를 관리
│   │   ├── App.css                 // App 컴포넌트의 스타일을 정의하는 CSS 파일
│   │   └── ...
│   ├── context                     // 리액트 컨텍스트를 정의하여 전역 상태를 관리하는 디렉토리
│   │   └── exampleContext.js       // 예제 컨텍스트 파일, 실제로 필요한 컨텍스트로 변경 가능
│   ├── hooks                       // 커스텀 리액트 훅을 정의하여 로직을 재사용하는 디렉토리
│   │   └── useExampleHook.js       // 예제 훅 파일, 실제로 필요한 훅으로 변경 가능
│   ├── services                    // API 호출 및 비즈니스 로직을 처리하는 서비스 파일들을 저장하는 디렉토리
│   │   └── api.js                  // API 호출을 처리하는 파일, 예: 서버와의 통신
│   ├── utils                       // 유틸리티 함수들을 저장하는 디렉토리
│   │   └── exampleUtil.js          // 예제 유틸리티 파일, 실제로 필요한 유틸리티 함수로 변경 가능
│   ├── index.js                    // 리액트 애플리케이션의 진입점 파일, 앱을 초기화하고 DOM에 렌더링
│   ├── index.css                   // 전역 스타일을 정의하는 CSS 파일
│   ├── App.test.js                 // App 컴포넌트에 대한 테스트 파일
│   ├── reportWebVitals.js          // 웹 바이탈 리포트를 위한 파일
│   ├── setupTests.js               // 테스트 설정 파일
└── ...

```
