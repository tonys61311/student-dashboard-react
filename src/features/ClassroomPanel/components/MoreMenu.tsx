import styled from "styled-components";
import { FiShuffle, FiRotateCw, FiUsers, FiX } from "react-icons/fi";

const MenuContainer = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
  width: 180px;
  z-index: 1000;
  overflow: hidden;
  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-5px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const MenuItem = styled.button`
  width: 100%;
  padding: 12px 15px;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  color: #333;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: background 0.2s ease-in-out;

  &:hover {
    background: #f0f0f0;
  }

  &:active {
    background: #e0e0e0;
  }

  svg {
    font-size: 16px;
    color: #007bff;
  }
`;

interface MoreMenuProps {
    onShuffleGroups: () => void;
    onResetScores: () => void;
    onToggleGuests: () => void;
    onClose: () => void;
}

const MoreMenu: React.FC<MoreMenuProps> = ({
    onShuffleGroups,
    onResetScores,
    onToggleGuests,
    onClose,
}) => {


    return (
        <MenuContainer>
            <MenuItem onClick={onToggleGuests}>
                <FiUsers /> 顯示 / 隱藏 Guest
            </MenuItem>
            <MenuItem onClick={onResetScores}>
                <FiRotateCw /> 重置分數
            </MenuItem>
            <MenuItem onClick={onShuffleGroups}>
                <FiShuffle /> 重新分組
            </MenuItem>
            <MenuItem onClick={onClose}>
                <FiX /> 關閉
            </MenuItem>
        </MenuContainer>
    );
};

export default MoreMenu;
