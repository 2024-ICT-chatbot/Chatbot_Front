const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry); // 누적 레이아웃 이동(CLS) 측정
      getFID(onPerfEntry); // 첫 입력 지연(FID) 측정
      getFCP(onPerfEntry); // 첫 번째 콘텐츠 도색(FCP) 측정
      getLCP(onPerfEntry); // 최대 콘텐츠 도색(LCP) 측정
      getTTFB(onPerfEntry); // 첫 바이트 시간(TTFB) 측정
    });
  }
};

export default reportWebVitals;
