import styled from "styled-components";
import { useAppDispatch } from "@/store/hooks";
import { incrementScore, decrementScore } from "@/store/slices/classInfoSlice";

const Card = styled.div<{ $isGuest: boolean }>`
  width: 100px;
  background: ${({ $isGuest }) => ($isGuest ? "#ddd" : "white")}; /* Guest 變灰 */
  border-radius: 5px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid ${({ $isGuest }) => ($isGuest ? "#ccc" : "#007bff")};
  overflow: hidden;
  opacity: ${({ $isGuest }) => ($isGuest ? 0.5 : 1)}; /* Guest 變半透明 */
`;

const StudentId = styled.div<{ $isGuest: boolean }>`
  width: 100%;
  background: ${({ $isGuest }) => ($isGuest ? "#bbb" : "#007bff")}; /* Guest ID 背景變灰 */
  color: white;
  font-size: 14px;
  font-weight: bold;
  padding: 5px 0;
`;

const StudentName = styled.div<{ $isGuest: boolean }>`
  font-size: 16px;
  font-weight: bold;
  color: ${({ $isGuest }) => ($isGuest ? "#aaa" : "black")}; /* Guest 文字變淡 */
  padding: 10px 0;
`;

const ScoreControls = styled.div<{ $isGuest: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  border-top: 1px solid ${({ $isGuest }) => ($isGuest ? "#ddd" : "#007bff")};;
  padding: 5px;
`;

const ScoreButton = styled.button<{ $color: string; $isGuest: boolean }>`
  flex: 1;
  border: none;
  padding: 5px 8px;
  cursor: ${({ $isGuest }) => ($isGuest ? "default" : "pointer")}; /* Guest 不能點擊 */
  font-size: 14px;
  font-weight: bold;
  background: ${({ $color, $isGuest }) => ($isGuest ? "#ccc" : $color)}; /* Guest 按鈕變灰 */
  color: ${({ $isGuest }) => ($isGuest ? "#888" : "white")}; /* Guest 按鈕文字變淡 */
  border-radius: 5px;
  pointer-events: ${({ $isGuest }) => ($isGuest ? "none" : "auto")}; /* 禁用 Guest 點擊 */
`;

const Score = styled.span<{ $isGuest: boolean }>`
  width: 30px;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  color: ${({ $isGuest }) => ($isGuest ? "#888" : "black")}; /* Guest 分數變淡 */
`;

interface StudentProps {
  student: {
    id: number;
    name: string;
    score: number;
    isGuest: boolean;
  };
}

const StudentCard: React.FC<StudentProps> = ({ student }) => {
  const dispatch = useAppDispatch();

  return (
    <Card $isGuest={student.isGuest}>
      <StudentId $isGuest={student.isGuest}>
        {student.id < 10 ? `0${student.id}` : student.id}
      </StudentId>
      <StudentName $isGuest={student.isGuest}>{student.name}</StudentName>
      <ScoreControls $isGuest={student.isGuest}>
        <ScoreButton
          $isGuest={student.isGuest}
          $color="#dc3545"
          onClick={() => dispatch(decrementScore(student.id))}
        >
          -1
        </ScoreButton>
        <Score $isGuest={student.isGuest}>{student.score}</Score>
        <ScoreButton
          $isGuest={student.isGuest}
          $color="#28a745"
          onClick={() => dispatch(incrementScore(student.id))}
        >
          +1
        </ScoreButton>
      </ScoreControls>
    </Card>
  );
};

export default StudentCard;
