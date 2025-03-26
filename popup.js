document.getElementById("startBtn").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: startRaceManipulation
    });
  });
});

function startRaceManipulation() {
  // Send a message to the content script to activate the logic
  chrome.runtime.sendMessage({ action: "overrideWinner" });
}
