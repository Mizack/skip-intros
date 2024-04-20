chrome.webNavigation.onCompleted.addListener(
    function (details) {

        let availableStreamingPlatforms = {
            "NETFLIX": "netflix.com",
            "MAX": "max.com",
        };

        Object.keys(availableStreamingPlatforms).forEach(streaming => {
            if (details.url.includes(availableStreamingPlatforms[streaming])) {
                callSkipOpening(streaming);
            }
        });

    },
    { urls: ["<all_urls>"] }
);

function callSkipOpening(streaming) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (!tabs || tabs.length == 0) {
            throw new Error('No tabs found!');
        }
        chrome.tabs.sendMessage(tabs[0].id, { action: 'skipOpening', param: streaming });
    });
}
