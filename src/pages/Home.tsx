import styled from "styled-components";
import QRCodeDialog from "@/features/QRCodeDialog";
import StudentDialog from "@/features/studentDialog";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchClassInfoData, selectClassInfo } from "@/store/slices/classInfoSlice";
import Loading from "@/components/Loading";
import ErrorScreen from "@/components/ErrorScreen";
import { RequestStatus } from "@/types/RequestStatus";

// 設定背景樣式
const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url("/images/background.svg");
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

// 彈窗容器
const DialogContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
  height: 100%;
`;

// 左側 QR Code 彈窗 (佔 40%)
const LeftPanel = styled.div`
  flex: 2;
`; 

// 右側 Tab 彈窗 (佔 60%)
const RightPanel = styled.div`
  flex: 3;
`;

const Home = () => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector(selectClassInfo); // 取得當前 API 請求狀態

  useEffect(() => {
    dispatch(fetchClassInfoData()); // 載入假資料，未來可串 API
  }, [dispatch]);

  // 正常載入 Home 畫面
  return (
    <AppContainer>
      {status === RequestStatus.Loading && <Loading />}
      {status === RequestStatus.Failed && <ErrorScreen />}

      {status === RequestStatus.Succeeded && (
        <DialogContainer>
          <LeftPanel>
            <QRCodeDialog />
          </LeftPanel>
          <RightPanel>
            <StudentDialog />
          </RightPanel>
        </DialogContainer>
      )}
    </AppContainer>
  );
};

export default Home;
