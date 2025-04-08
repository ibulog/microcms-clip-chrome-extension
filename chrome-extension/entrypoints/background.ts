export default defineBackground(() => {
  let pageInfo: { title: string; url: string } | null = null;

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Message received:", request, sender);

    // コンテンツスクリプトからのメッセージ処理
    if (request.action === "savePageInfo") {
      pageInfo = request.pageInfo;
      console.log("Page info saved:", pageInfo);
      sendResponse({
        status: "success",
        message: "Page info received",
      });
      return true;
    }

    // ポップアップからのメッセージ処理
    if (request.action === "getPageInfo") {
      sendResponse(pageInfo);
      return true;
    }

    sendResponse({ status: "error", message: "Invalid request" });
    return true;
  });
});
