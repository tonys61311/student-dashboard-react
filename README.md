# Student Dashboard React

## 程式設計概述

本專案是一個基於 **Vite + React** 和 **Redux Toolkit** 開發的網頁，並使用 **Styled Components** 進行 UI 樣式管理以及支援 RWD 以適應不同裝置的顯示需求。專案的核心功能包括QR Code 連結顯示、複製QR code連結、顯示/隱藏 Guest 學生、隨機分組、分數增減等。此外，專案透過 **GitHub Pages** 自動部署，並使用 **fetch API** 讀取本地假資料（`mockData.json`），模擬後端 API 回應。

## GitHub Pages 展示

[Student Dashboard React - Demo](https://tonys61311.github.io/student-dashboard-react/)

## 專案結構

```
public                          # 靜態資源
├── images                      # 存放圖片資源
├── mockData.json               # 模擬 API 回應的 JSON 檔案
└── vite.svg                    # Vite 預設的圖示

src                             # 程式碼主目錄
├── assets                      # 靜態資源，如圖示或樣式文件
├── common                      # 通用 UI 元件
│   ├── CopyButton.tsx          # 複製按鈕元件
│   ├── Dialog.tsx              # 通用對話框元件
│   ├── ErrorScreen.tsx         # 錯誤畫面顯示元件
│   └── Loading.tsx             # 載入畫面顯示元件
├── hooks                       # 自訂 hooks
│   └── hooks.ts                # Redux hooks
├── slices                      # 狀態管理 (Redux)
│   ├── classInfoSlice.ts       # 學生班級資訊的狀態管理
│   └── store.ts                # Redux store 設定
├── styles                      # 樣式管理
│   ├── GlobalStyle.ts          # 全域樣式設定
│   └── theme.ts                # 主題設定
├── types                       # TypeScript 類型
│   └── RequestStatus.ts        # API 請求狀態類型
├── utils                       # 工具函式
│   └── fetchWithLog.ts         # 包裝 fetch 並記錄請求資訊
├── features
│   └── ClassroomPanel          # 主要功能區 (ClassroomPanel 模組)
│      ├── components              # ClassroomPanel 內部 UI 元件
│      │   ├── GroupList.tsx       # 學生分組列表
│      │   ├── MoreButton.tsx      # 更多選單按鈕
│      │   ├── MoreMenu.tsx        # 更多選單內容
│      │   ├── StudentCard.tsx     # 學生資訊卡片
│      │   ├── StudentList.tsx     # 學生列表顯示元件
│      │   └── Tabs.tsx            # 學生管理分頁標籤
│      ├── containers              # ClassroomPanel 主要容器
│      │   ├── QRCodeDialog.tsx    # QR Code 彈窗元件
│      │   └── StudentDialog.tsx   # 學生管理對話框
│      └── index.tsx               # ClassroomPanel 主要畫面
├── App.css                     # 全域 CSS 樣式
├── App.tsx                     # React 主要應用程式入口
├── index.css                   # 頁面樣式
├── main.tsx                    # 應用程式的主入口
└── vite-env.d.ts               # Vite 環境變數定義
```

### 核心技術與架構
- **React 18+**：作為前端 UI 框架，負責組件化開發
- **Redux Toolkit**：用於管理應用狀態，包含學生資料、顯示選項等
- **Styled Components**：用來管理 UI 樣式，確保元件的獨立性與可維護性
- **React Icons**：使用 `react-icons` 套件提供常見的 UI 圖示
- **TypeScript**：提供靜態類型檢查，提升程式碼的可靠性
- **Vite**：作為專案的開發與建置工具，提供高效的開發體驗
- **GitHub Actions**：自動化 CI/CD，每次 push 後自動部署至 GitHub Pages

### 程式邏輯與核心功能

#### 1. 狀態管理 (Redux Toolkit)
專案使用 Redux Toolkit 來管理學生資料，包含：
##### classInfoSlice.ts
- `students`：學生清單（從 `mockData.json` 讀取）
- `id, title, link ...`：課程資訊
- `status`：API 請求狀態 (`idle`, `loading`, `failed`, `succeeded`)

**狀態變更的核心 reducers**
- `fetchClassInfoData()`：透過 `fetch API` 讀取 `mockData.json`
- `incrementScore(id)` / `decrementScore(id)`：增減學生分數
- `resetScores()`：重置所有學生分數
- `toggleGuests()`：顯示/隱藏 Guest 學生

#### 2. 首頁 (Home.tsx)
- 使用 `useAppDispatch` 觸發 `fetchClassInfoData()` 讀取學生資料
- 依據 `RequestStatus` 對應顯示 `Loading` 畫面、 `ErrorScreen` 畫面 或 `QRCodeDialog` 與 `StudentDialog` 彈窗

#### 3. QRCodeDialog
- 顯示 QR Code 彈窗 (使用 `Dialog` 元件) (左側)
- 使用 `useAppSelector(selectClassInfo)` 取得課程資料 `id, link, title`
- 透過 `react-qr-code` 套件產生 QR Code
- 根據視窗大小，動態調整 QR Code 尺寸
- 使用 `CopyButton` 元件複製 QR Code 連結

#### 4. StudentDialog
- 顯示 StudentList 彈窗 (使用 `Dialog` 元件) (右側)
- 使用 `useAppSelector(selectClassInfo)` 取得課程資料 `title` 以及所有學生資訊 `students`
- `Tabs` 元件切換 `StudentList.tsx` 與 `GroupList.tsx`
  - `StudentList`: 顯示所有學生的資料卡片(`StudentCard` 元件)，可動態篩選 Guest (根據 `student.isGuest` 屬性)
    - 點擊增減分數按鈕: 分別使用 `incrementScore(id)` 、 `decrementScore(id)` reducer 增減學生分數
  - `GroupList`: 顯示學生分組資訊 (id: 名字)，每組5人，隨機分配
  - `MoreButton`: 點擊顯示選單 `MoreMenu` (顯示/隱藏 Guest、重置分數、重新分組)
    - `顯示/隱藏 Guest`: 隨機分組，使用 `toggleGuests()` reducer
    - `重置分數`: 重置所有學生分數，使用 `resetScores()` reducer
    - `重新分組`: 隨機分組，修改 <GroupList key={shuffleKey}>, 使得GroupList重新渲染

## 安裝

1. Clone this repository:
   ```bash
   git clone https://github.com/tonys61311/student-dashboard-react.git
   ```

2. Navigate into the project directory：
   ```bash
   cd student-dashboard-react
   ```

3. Install dependencies：
   ```bash
   npm install
   ```

4. Start the local development server：
   ```bash
   npm run dev
   ```