export default defineContentScript({
  matches: ["<all_urls>"],
  main() {
    type PageInfo = {
      action: string;
      title: string;
      url: string;
    };
    const pageInfo: PageInfo = {
      title: document.title,
      url: location.href,
    };
    const message = {
      action: "savePageInfo",
      pageInfo: pageInfo,
    };

    try {
      chrome.runtime.sendMessage(message, (response) => {
        console.log("Response from background:", response);
      });
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  },
});
