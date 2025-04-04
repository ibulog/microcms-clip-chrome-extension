import { useState, useEffect } from "react";
import { createClient } from "microcms-js-sdk";
import "./App.css";

// microCMSクライアントの初期化
const client = createClient({
  serviceDomain: "",
  apiKey: "",
});

function App() {
  const [pageInfo, setPageInfo] = useState({
    title: "",
    url: "",
  });

  // ページ情報をサービスワーカーから取得する関数
  const fetchPageInfo = async () => {
    try {
      const response = await new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({ action: "getPageInfo" }, (response) => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve(response);
          }
        });
      });

      if (response) {
        setPageInfo({
          title: response.title || "No title",
          url: response.url || "No URL",
        });
      } else {
        console.error("Failed to fetch page info");
      }
    } catch (error) {
      console.error("Error fetching page info:", error);
    }
  };

  // microCMSにデータを保存する関数
  const saveToMicroCMS = async () => {
    try {
      const response = await client.create({
        endpoint: "",
        content: {
          title: pageInfo.title,
          url: pageInfo.url,
        },
      });
      console.log("Data saved to microCMS:", response);
      alert("データが保存されました！");
    } catch (error) {
      console.error("Failed to save data to microCMS:", error);
      alert("データの保存に失敗しました。");
    }
  };

  useEffect(() => {
    fetchPageInfo();
  }, []);

  return (
    <div>
      <p>Title: {pageInfo.title}</p>
      <p>URL: {pageInfo.url}</p>
      <button onClick={saveToMicroCMS}>Save to microCMS</button>
    </div>
  );
}

export default App;
