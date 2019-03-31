function isEnjinUrl(url) {
	// Every site with the enjin.com domain
	var regex = RegExp("https?://([a-z0-9]+[.])*enjin[.]com");

	// Run the URL against the regular expression, checking if it's an Enjin URL
	if (regex.test(url) == true) {
		return true;
	} else {
		return false;
	}
}

function isThisTabTheFirstEnjinTab(tabIds, senderId) {
	console.log("ID " + tabIds[0] + " against ID " + senderId);

	// If the first ID in the array is the ID that the foreground sends along, return true
	if (tabIds[0] == senderId) {
		return true;
	}
	
}

// Listen for messages to this script
chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {


		if (request.msg == "Am I the first tab?") {

			var tabIds = [];
			var senderId = sender.tab.id;

			// Loop through all the tabs, and for each one, see if it's an Enjin tab. So yes, add it to the Ids array.
			chrome.tabs.query({}, function (tabs) {
				tabs.forEach(a => {
					if (isEnjinUrl(a.url) == true) {
						tabIds.push(a.id);
					}

				});

				// If it is the first Enjin tab in the browser, send true. If not, send false
				if (isThisTabTheFirstEnjinTab(tabIds, senderId)) {
					sendResponse({
						result: true
					});
				} else {
					sendResponse({
						result: false
					});
				}

			});

		} else {
			// If the message is wrong, give an error.
			sendResponse({
				result: "error",
				message: `Invalid message`
			});
		}
		return true;
	});

console.log("This is background.js reporting for duty!");