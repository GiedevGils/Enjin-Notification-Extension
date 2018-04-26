chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.msg == "Am I the only tab?") {

        var logger = chrome.tabs.query({}, function (tabs) {
            tabs.forEach(a => {
                console.log(a.url);
            });
        })

        console.log("Logger: " + logger);

        sendResponse({ result: true });
      } else {
        sendResponse({ result: "error", message: `Invalid message` });
      }
      return true; 
    });
console.log("this is background.js reporting for duty");
