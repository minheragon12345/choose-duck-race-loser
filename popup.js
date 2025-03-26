document.addEventListener("DOMContentLoaded", function () {
  const submitButton = document.getElementById("submit");
  submitButton.addEventListener("click", function () {
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
});
