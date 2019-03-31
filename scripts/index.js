chrome.runtime.sendMessage(
    // Send a message to the background script, sending a question. the URL of the webpage and the tabID
    {
        msg: "Am I the first tab?",
        url: window.location.href
    },
    function (response) {

        if (response.result == true) {

            // Make a console log to make sure the extension is running
            console.log('Enjin Notification Extension active!');

            // Create an HTML Script tag
            var script = document.createElement('script');

            // Make the source of that script tag the notification file
            script.src = chrome.extension.getURL('./scripts/notification_script.js');

            // Add the script tag to the end of the Head
            (document.head).appendChild(script);
        } else {
            null;
        }
    }
);
