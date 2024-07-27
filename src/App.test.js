import { render, screen } from '@testing-library/react';
import App from './App';

// 'learn react' 텍스트가 포함된 링크 요소가 렌더링되는지 테스트
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i); // 'learn react' 텍스트를 포함한 요소 찾기
  expect(linkElement).toBeInTheDocument(); // 요소가 문서 내에 존재하는지 확인
});
