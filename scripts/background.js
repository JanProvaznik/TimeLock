chrome.webNavigation.onCompleted.addListener(function(details) {
    if (details.url.startsWith('chrome')) {
        return;  // Do not attempt to inject scripts in chrome-specific URLs
    }

    chrome.scripting.executeScript({
        target: {tabId: details.tabId},
        files: ['scripts/block.js']
    });
});
