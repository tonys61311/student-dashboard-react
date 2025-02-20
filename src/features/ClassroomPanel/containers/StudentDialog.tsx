import Dialog from "@/common/components/Dialog";
import Tabs from "@/features/ClassroomPanel/components/Tabs";
import styled from "styled-components";
import { useAppSelector } from "@/common/hooks/hooks";
import { selectClassInfo } from "@/common/slices/classInfoSlice";
import { FiUser } from "react-icons/fi";

const DialogContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; /* 讓內容均分對齊兩邊 */
  font-size: 18px;
  padding: 10px;
`;

const TitleSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const UserIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const TabContainer = styled.div`
  flex-grow: 1;
  overflow: auto;
`;

const StudentDialog = () => {
  const { title, students } = useAppSelector(selectClassInfo);
  const totalStudents = students.length;
  const nonGuestCount = students.filter((student) => !student.isGuest).length;

  return (
    <Dialog>
      <DialogContainer>
        <Header>
          {/* 左側標題 + 學生數 */}
          <TitleSection>
            <h3>{title}</h3>
            <UserIcon>
              <FiUser /> {nonGuestCount}/{totalStudents}
            </UserIcon>
          </TitleSection>
        </Header>

        <TabContainer>
          <Tabs />
        </TabContainer>
      </DialogContainer>
    </Dialog>
  );
};

export default StudentDialog;
