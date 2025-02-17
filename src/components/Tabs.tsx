import { useState } from "react";
import styled from "styled-components";
import MoreButton from "./MoreButton";
import StudentList from "@/features/studentDialog/StudentList";
import GroupList from "@/features/studentDialog/GroupList";
import { useAppDispatch } from "@/store/hooks";
import { resetScores, toggleGuests } from "@/store/slices/classInfoSlice";

const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const TabHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; /* 讓內容均分對齊兩邊 */
  padding: 0 30px;
`;

const ButtonSection = styled.div`
  display: flex;
  gap: 5px;
`;

const TabButton = styled.button<{ $active: boolean }>`
  min-width: 150px;
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  border: none;
  border-radius: 10px 10px 0 0;
  background: ${({ $active }) => ($active ? "white" : "#c8c8c8")};
  color: ${({ $active }) => ($active ? "#2196f3" : "gray")};
  transition: background 0.3s;
  position: relative;
  z-index: ${({ $active }) => ($active ? 2 : 1)};

  &:hover {
    opacity: 0.8;
  }
`;

const TabContent = styled.div`
  padding: 15px;
  background: white;
  flex-grow: 1;
  border-radius: 10px;
  overflow: auto;
  box-shadow: 0px -3px 8px rgba(0, 0, 0, 0.15);
  position: relative;
  z-index: 1;
`;

const Tabs: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const dispatch = useAppDispatch();

  const [shuffleKey, setShuffleKey] = useState(0);

  const handleShuffleGroups = () => {
    setShuffleKey((prev) => prev + 1); // 更新 `key` 讓 `GroupList` 重新計算
  };

  return (
    <TabsContainer>
      <TabHeader>
        <ButtonSection>
          <TabButton $active={activeIndex === 0} onClick={() => setActiveIndex(0)}>Student List</TabButton>
          <TabButton $active={activeIndex === 1} onClick={() => setActiveIndex(1)}>Group</TabButton>
        </ButtonSection>
        <MoreButton
            onShuffleGroups={handleShuffleGroups}
            onResetScores={() => dispatch(resetScores())}
            onToggleGuests={() => dispatch(toggleGuests())}
          />
      </TabHeader>
      <TabContent>
       <div style={{ display: activeIndex === 0 ? "block" : "none" }}> <StudentList /></div>
        <div style={{ display: activeIndex === 1 ? "block" : "none" }}> <GroupList key={shuffleKey} /></div>
      </TabContent>
    </TabsContainer>
  );
};


export default Tabs;
