chrome.action.onClicked.addListener(() => {
  const url = chrome.runtime.getURL("index.html"); // Generate URL to index.html
  chrome.tabs.create({ url: url }); // Open a new tab with the generated URL
});
