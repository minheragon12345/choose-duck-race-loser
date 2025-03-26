document.addEventListener("DOMContentLoaded", function () {
  submitButton.addEventListener("click", function () {
    saveValue();
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: "overrideWinner", winner: winner },
        (response) => {
          window.close();
        }
      );
    });
  });
}
