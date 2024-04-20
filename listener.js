chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === "skipOpening") {
        skipOpening(message.param);
    }
});