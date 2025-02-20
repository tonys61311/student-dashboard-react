import { useState, useEffect, useRef, useCallback } from "react";
import Dialog from "@/common/components/Dialog";
import QRCode from "react-qr-code";
import styled from "styled-components";
import CopyButton from "@/common/components/CopyButton";
import { useAppSelector } from "@/common/hooks/hooks";
import { selectClassInfo } from "@/common/slices/classInfoSlice";

const DialogContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const QRContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 18px;
`;

const QRCodeDialog = () => {
  const [size, setSize] = useState(150); // 初始大小
  const dialogRef = useRef<HTMLDivElement>(null);

  const { id, link, title } = useAppSelector(selectClassInfo);

  const updateQRCodeSize = useCallback(() => {
    if (!dialogRef.current) return;
    const dialogWidth = dialogRef.current.offsetWidth;
    const dialogHeight = dialogRef.current.offsetHeight;
    const newSize = Math.max(Math.min(dialogWidth * 0.8, dialogHeight * 0.8), 150);
    setSize(newSize);
  }, []);

  useEffect(() => {
    if (!dialogRef.current) return;
    // 使用 ResizeObserver 監聽 Dialog 大小變化
    const observer = new ResizeObserver(updateQRCodeSize);
    observer.observe(dialogRef.current);

    // 監聽 window.resize
    // window.addEventListener("resize", updateQRCodeSize);

    // Cleanup function
    return () => {
      observer.disconnect();
      // window.removeEventListener("resize", updateQRCodeSize);
    };
  }, []);

  return (
    <Dialog>
      <DialogContainer ref={dialogRef}>
        <h3>Join {title}</h3>
        <InfoContainer>
          <CopyButton title={`ID:${id}`} textToCopy={id} />
          <CopyButton title="Link" textToCopy={link} />
        </InfoContainer>
        <QRContainer>
          <QRCode value={link} size={size} />
        </QRContainer>
      </DialogContainer>
    </Dialog>
  );
};

export default QRCodeDialog;
