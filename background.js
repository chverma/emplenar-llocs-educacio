// Example of a simple user data object
const user = {
    username: 'demo-user'
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // 2. A page requested user data, respond with a copy of `user`
    console.log("BACKGROUND REVEIVED MESSSAGE")
    if (message === 'get-user-data') {
        sendResponse(user);
    } else if (message === 'get-all-places') {
        //getAllPlaces(46812);
    }
});