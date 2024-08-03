#프로젝트 아키텍처
-----

```
project-root
├── public                          // 정적 파일들을 저장하는 디렉토리 (favicon, index.html 등)
│   ├── favicon.ico
│   ├── index.html
│   └── ...
├── src
│   ├── assets
│   │   ├── images
│   │   │   └── bot_character.png
│   ├── components
│   │   ├── ChatMessage.js
│   │   ├── ChatMessage.css
│   └── containers
│       ├── App.js
│       ├── App.css
│   ├── context
│   │   └── exampleContext.js
│   ├── hooks
│   │   └── useExampleHook.js
│   ├── services
│   │   └── api.js
│   ├── utils
│   │   └── exampleUtil.js
│   ├── index.js
│   ├── index.css
└── ...

```
