import React, { ReactNode, useState } from "react";
import styled from "styled-components";

const DialogContainer = styled.div`
  position: relative;
  background: #edebeb;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  min-width: 300px;
  height: 100%;
  overflow: auto;
`;

const CloseButton = styled.button`
  position: absolute;
  padding: 0;
  top: 5px;
  right: 5px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #666;

  &:hover {
    color: #000;
  }
`;

interface DialogProps {
  children: ReactNode;
}

const Dialog: React.FC<DialogProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(true); // 控制彈窗顯示狀態

  if (!isVisible) return null; // 如果關閉，就不渲染彈窗

  return (
    <DialogContainer>
      <CloseButton onClick={() => setIsVisible(false)}>✖</CloseButton> {/* X 按鈕 */}
      {children}
    </DialogContainer>
  );
};

export default Dialog;
