function checkRequiredInput() {
    var espCode = document.querySelector('#especialitatCode').value;
    var espName = document.querySelector('#especialitatName').value;
    var postalCode = document.querySelector('#postalCode').value;

    if (espName && espCode && postalCode) {
        var options = {
            'options': {
                'espName': espName,
                'espCode': espCode,
                'postalCode': postalCode
            }
        };

        chrome.storage.local.set(options);
        executeScript();
    } else {
        return false;
    }
}

function executeScript() {
    // Querying browser tab
    return chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
        // Executing script
        return chrome.tabs.executeScript(tabs[0].id, {
            file: "/fillPlaces.js"
        });
    });
}
// Run button on click
document.querySelector('#run_btn').addEventListener('click', (e) => {
    e.preventDefault();
    return checkRequiredInput();

});

console.log("popup.js done");