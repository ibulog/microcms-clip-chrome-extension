import { useState } from "react";
import { secrets } from "@/utils/storage";
import "./App.css";

function App() {
  const [serviceDomain, setServiceDomain] = useState("");
  const [apiKey, setApiKey] = useState("");

  // secretsを保存する関数
  const handleSave = async () => {
    await secrets.setValue({
      serviceDomain,
      apiKey,
    });
    alert("設定が保存されました。");
  };

  return (
    <>
      <h1>microCMS認証情報</h1>
      <div className="form-group">
        <label htmlFor="serviceDomain">サービスドメイン</label>
        <input
          type="text"
          id="serviceDomain"
          value={serviceDomain}
          onChange={(e) => setServiceDomain(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="apiKey">APIキー</label>
        <input
          type="text"
          id="apiKey"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
      </div>
      <div className="button-container">
        <button onClick={handleSave}>設定を保存</button>
      </div>
    </>
  );
}

export default App;
