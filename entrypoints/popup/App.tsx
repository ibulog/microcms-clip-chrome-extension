import { useState, useEffect } from "react";
import "./App.css";

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

  useEffect(() => {
    fetchPageInfo();
  }, []);

  return (
    <div>
      <p>Title: {pageInfo.title}</p>
      <p>URL: {pageInfo.url}</p>
    </div>
  );
}

export default App;
