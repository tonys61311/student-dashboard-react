import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FiMoreVertical } from "react-icons/fi";
import MoreMenu from "./MoreMenu";

const ButtonContainer = styled.div`
  position: relative;
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  padding: 5px;
  transition: background 0.2s ease;
  border-radius: 50%;

  &:hover {
    background: #cdcbcb;
  }

  svg {
    color: black;
  }
`;

interface MoreButtonProps {
    onShuffleGroups: () => void;
    onResetScores: () => void;
    onToggleGuests: () => void;
}

const MoreButton: React.FC<MoreButtonProps> = ({
    onShuffleGroups,
    onResetScores,
    onToggleGuests,
}) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const onClose = () => {
        setMenuOpen(false);
    }

    const menuRef = useRef<HTMLDivElement>(null);
    
      // 監聽點擊 Menu 外部時關閉 Menu
      useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            onClose();
          }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [onClose]);
    return (
        <ButtonContainer ref={menuRef}>
            <IconButton
                onClick={(event) => {
                    event.stopPropagation();
                    setMenuOpen((prev) => !prev);
                }}
            >
                <FiMoreVertical />
            </IconButton>
            {menuOpen && (
                <MoreMenu
                    onShuffleGroups={() => {
                        onShuffleGroups();
                        onClose();
                    }}
                    onResetScores={() => {
                        onResetScores();
                        onClose();
                    }}
                    onToggleGuests={() => {
                        onToggleGuests();
                        onClose();
                    }}
                    onClose={onClose}
                />
            )}
        </ButtonContainer>
    );
};

export default MoreButton;
