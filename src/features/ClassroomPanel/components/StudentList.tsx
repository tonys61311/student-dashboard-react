import styled from "styled-components";
import StudentCard from "@/features/ClassroomPanel/components/StudentCard";
import { useAppSelector } from "@/common/hooks/hooks";
import { selectClassInfo } from "@/common/slices/classInfoSlice";
import { useState, useEffect } from "react";

const StudentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 10px;
  padding: 10px;
`;

const AnimatedStudentCard = styled.div<{ $visible: boolean }>`
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: scale(${({ $visible }) => ($visible ? 1 : 0.8)});
  transition: opacity 0.3s ease, transform 0.3s ease;
`;

const StudentList = () => {
  const {showGuests, students} = useAppSelector(selectClassInfo);
  const [filteredStudents, setFilteredStudents] = useState(students);
  // 當 `showGuests` 改變時，做動畫
  useEffect(() => {
    if (showGuests) {
      setFilteredStudents(students);
    } else {
      setTimeout(() => setFilteredStudents(students.filter((s) => !s.isGuest)), 300);
    }
  }, [showGuests, students]);

  return (
    <StudentGrid>
      {filteredStudents.map((student) => (
        <AnimatedStudentCard key={student.id} $visible={showGuests || !student.isGuest}>
          <StudentCard student={student} />
        </AnimatedStudentCard>
      ))}
    </StudentGrid>
  );
};

export default StudentList;
