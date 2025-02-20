import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchWithLog } from "@/common/utils/fetchWithLog";
import { RequestStatus } from "@/common/types/RequestStatus";
import { RootState } from "./store";

// API 回應的類型
export interface Student {
  id: number;
  name: string;
  score: number;
  isGuest: boolean;
}

interface ClassInfoResponse {
  id: string;
  link: string;
  title: string;
  students: Student[];
}

// Redux `state` 的類型
interface ClassInfoState {
  id: string;
  link: string;
  title: string;
  students: Student[];
  showGuests: boolean;
  status: RequestStatus;
}

// 初始狀態
const initialState: ClassInfoState = {
  id: "",
  link: "",
  title: "",
  students: [],
  showGuests: true,
  status: RequestStatus.Idle,
};

// `fetchClassInfoData` 來獲取完整的班級資訊（QR Code + 學生清單）
export const fetchClassInfoData = createAsyncThunk(
  "classInfo/fetchClassInfo",
  async (): Promise<ClassInfoResponse> => {
    return await fetchWithLog<ClassInfoResponse>("/student-dashboard-react/mockData.json");
  }
);

const classInfoSlice = createSlice({
  name: "classInfo",
  initialState,
  reducers: {
    // 設定整體班級資訊（手動更新）
    setClassInfoData: (state, action: PayloadAction<ClassInfoResponse>) => {
      state.id = action.payload.id;
      state.link = action.payload.link;
      state.title = action.payload.title;
      state.students = action.payload.students;
    },
    // 增加學生的分數
    incrementScore: (state, action: PayloadAction<number>) => {
      const student = state.students.find((s) => s.id === action.payload);
      if (student) student.score += 1;
    },
    // 減少學生的分數
    decrementScore: (state, action: PayloadAction<number>) => {
      const student = state.students.find((s) => s.id === action.payload);
      if (student) student.score -= 1;
    },
    resetScores: (state) => {
      state.students.forEach((s) => (s.score = 0));
    },
    toggleGuests: (state) => {
      state.showGuests = !state.showGuests;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClassInfoData.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchClassInfoData.fulfilled, (state, action) => {
        state.status = RequestStatus.Succeeded;
        state.id = action.payload.id;
        state.link = action.payload.link;
        state.title = action.payload.title;
        state.students = action.payload.students;
      })
      .addCase(fetchClassInfoData.rejected, (state) => {
        state.status = RequestStatus.Failed;
      });
  },
});

// 匯出 Actions
export const { incrementScore, decrementScore, resetScores, toggleGuests } = classInfoSlice.actions;

// Selector：取得班級資訊
export const selectClassInfo = (state: RootState) => state.classInfo;

// 匯出 Reducer
export default classInfoSlice.reducer;
