import styled from "styled-components";
import { useAppSelector } from "@/common/hooks/hooks";
import { selectClassInfo, Student } from "@/common/slices/classInfoSlice";
import { useMemo } from "react";

// 分組容器
const GroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 10px;
`;

const RandomGroupTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #17a2b8;
  text-align: center;
  padding: 10px 0;
  border-bottom: 2px solid #ccc;
`;

// 分組標題
const GroupTitle = styled.h4`
  margin: 0;
  padding-bottom: 8px;
  border-bottom: 2px solid #ccc;
  text-align: center;
  font-weight: bold;
  color: #007bff;
`;

// 成員容器
const GroupMembers = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  margin-top: 10px;
`;

// ID 標籤
const IDBadge = styled.span<{ $isGuest: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${({ $isGuest }) => ($isGuest ? "#bbb" : "#0056b3")};
  color: white;
`;

// 成員卡片組件
const MemberCard = styled.div<{ $isGuest: boolean }>`
  display: flex;
  gap: 5px;
  align-items: center;
  padding: 8px 12px;
  border-radius: 8px;
  background: ${({ $isGuest }) => ($isGuest ? "#ddd" : "#007bff")};
  color: ${({ $isGuest }) => ($isGuest ? "#666" : "white")};
  font-size: 14px;
  font-weight: bold;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
  justify-content: space-between;
`;

// ✅ Member 組件
const Member = ({ student }: { student: Student }) => (
  <MemberCard $isGuest={student.isGuest}>
    <IDBadge $isGuest={student.isGuest}>
      {student.id < 10 ? `0${student.id}` : student.id}
    </IDBadge>
    {student.name}
  </MemberCard>
);

// ✅ GroupBox 組件
const GroupBoxContainer = styled.div`
  border: 2px solid #007bff;
  border-radius: 10px;
  padding: 15px;
  background: white;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
`;

const GroupBox = ({ group, index }: { group: Student[]; index: number }) => (
  <GroupBoxContainer>
    <GroupTitle>Group {index + 1}</GroupTitle>
    <GroupMembers>
      {group.map((student) => (
        <Member key={student.id} student={student} />
      ))}
    </GroupMembers>
  </GroupBoxContainer>
);

// ✅ 隨機打亂學生順序
const shuffleArray = (array: Student[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const GroupList = () => {
  const { students } = useAppSelector(selectClassInfo);

  // 讓分組只執行一次
  const groups = useMemo(() => {
    const shuffledStudents = shuffleArray(students); // 只打亂一次
    return shuffledStudents.reduce<Student[][]>((acc, student, index) => {
      const groupIndex = Math.floor(index / 5);
      if (!acc[groupIndex]) acc[groupIndex] = [];
      acc[groupIndex].push(student);
      return acc;
    }, []);
  }, [students.length]);

  return (
    <GroupContainer>
      {groups.length > 0 && <RandomGroupTitle>隨機分組</RandomGroupTitle>}
      {groups.map((group, idx) => (
        <GroupBox key={idx} group={group} index={idx} />
      ))}
    </GroupContainer>
  );
};

export default GroupList;
