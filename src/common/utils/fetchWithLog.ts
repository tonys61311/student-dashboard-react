export const fetchWithLog = async <T>(url: string, options?: RequestInit): Promise<T> => {
  console.log(`發送 API 請求: ${url}`);

  try {
    const response = await fetch(url, options);
    console.log(`API 回應狀態:`, response.status, response.statusText);

    const data = await response.json();
    console.log(`API 回應成功: ${url}`, data);
    return data;
  } catch (error) {
    console.error(`API 失敗: ${url}`, error);
    throw error;
  }
};
