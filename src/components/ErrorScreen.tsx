import styled from "styled-components";

const Overlay = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: 1000;
  text-align: center;
`;

const ErrorTitle = styled.h2`
  color: #d9534f;
  font-size: 22px;
  font-weight: bold;
`;

const ErrorMessage = styled.p`
  color: #333;
  font-size: 16px;
`;

const ReloadButton = styled.button`
  background-color: #d9534f;
  color: white;
  border: none;
  padding: 10px 15px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 10px;

  &:hover {
    background-color: #c9302c;
  }
`;

const ErrorScreen = () => {
  return (
    <Overlay>
      <ErrorTitle>⚠ 發生錯誤</ErrorTitle>
      <ErrorMessage>請檢查網路連線或稍後再試</ErrorMessage>
      <ReloadButton onClick={() => window.location.reload()}>重新載入</ReloadButton>
    </Overlay>
  );
};

export default ErrorScreen;
