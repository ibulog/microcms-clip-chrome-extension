import { useState, useEffect } from "react";
import { createClient } from "microcms-js-sdk";
import "./App.css";

import type { MicroCMSListContent } from "microcms-js-sdk";

type Category = {
  id: string;
  name: string;
};

type CategoryResponse = MicroCMSListContent & Category;

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
  const [comment, setComment] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // ページ情報をサービスワーカーから取得する関数
  const getPageInfo = async () => {
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

  // カテゴリーをmicroCMSから取得する関数
  const fetchCategories = async () => {
    try {
      const response = await client.getList({
        endpoint: "categories",
      });
      const categories = response.contents.map((category: CategoryResponse) => {
        return {
          id: category.id,
          name: category.name,
        };
      });
      setCategories(categories);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
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
          comment: comment,
          category: selectedCategory,
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
    getPageInfo();
    fetchCategories();
  }, []);

  return (
    <div>
      <p>Title: {pageInfo.title}</p>
      <p>URL: {pageInfo.url}</p>
      <div>
        <label>カテゴリー:</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">選択してください</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <textarea
        placeholder="コメントを入力してください"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button onClick={saveToMicroCMS}>Save to microCMS</button>
    </div>
  );
}

export default App;
