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

        chrome.storage.local.set(options)
        setItem();

    } else {
        return false;
    }
}

function setItem() {
    let tabID = -1;
    // Querying browser tab
    return chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
            console.log(tabs)
            // Executing script
            return chrome.tabs.executeScript(tabs[0].id, {
                file: "/fillPlaces.js"
            });
        })

    function logTabs(tabs) {
        tabID = tabs[0].id;
        console.log("tab: ", tabs[0].id)
    }

    function onError(error) {
        console.log(`Error: ${error}`);
    }

    function onExecuted(result) {
        console.log(`onExecuted`);
    }
}
// Run button on click
document.querySelector('#run_btn').addEventListener('click', (e) => {
    e.preventDefault();
    return checkRequiredInput()

});

console.log("popup.js done");