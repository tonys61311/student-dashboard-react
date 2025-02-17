import { useState } from "react";
import styled from "styled-components";
import { FiCopy, FiCheck } from "react-icons/fi";

const CopyButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
`;

const Button = styled.button`
  background: #2196f3;
  border: none;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #1976d2;
  }

  svg {
    color: white;
    font-size: 20px;
  }
`;

interface CopyButtonProps {
  title: string;
  textToCopy: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ title, textToCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000); // 3 秒後恢復
  };

  return (
    <CopyButtonContainer>
      <p>{title}</p>
      <Button onClick={handleCopy}>
        {copied ? <FiCheck /> : <FiCopy />}
      </Button>
    </CopyButtonContainer>
  );
};

export default CopyButton;
