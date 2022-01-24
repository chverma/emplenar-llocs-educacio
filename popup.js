let sepiaLevel = -1;
let centerPlaces = {};




chrome.runtime.sendMessage('get-user-data', (response) => {
    // 3. Got an asynchronous response with the data from the background
    console.log('received user data', response);

});

function gotSepiaLevel(item) {
    console.log(`${Object.keys(item)[0]} has ${item.sepiaLevel}`);
}

function gotCenterPlaces(item) {
    console.log(`${Object.keys(item)[0]} has ${JSON.stringify(item.centerPlaces)}`);
}


function onError(error) {
    console.log("Ta tia")
    console.log(error)
}

// initialize
async function init() {

    let input = document.querySelector('#sepia_range');
    input.addEventListener('change', e => {
        //e.target.value
    });
    chrome.runtime.sendMessage({
        request: "centerPlaces" //get from tab's local storage
    });
    console.log("init1");
    // get the objects
    console.log("localStorage: ", localStorage)
    chrome.storage.local.get("sepiaLevel")
        .then(gotSepiaLevel, onError);
    console.log("init2");
    chrome.storage.local.get("centerPlaces")
        .then(gotCenterPlaces, onError);



    /*if (!sepiaLevel) {
        sepiaLevel = {};
        sepiaLevel.name = 'sepiaLevel'
        sepiaLevel.value = 0
    }
    if (!centerPlaces) {
        centerPlaces = {};
        centerPlaces.name = 'centerPlaces'
        centerPlaces.value = {}
    }

    input.value = sepiaLevel.value;*/

    //chrome.storage.local.set({ sepiaLevel, centerPlaces });
    //console.log("init__", browser.storage.local.get('sepiaLevel').item)
}


// Run button on click
document.querySelector('#run_btn').addEventListener('click', () => {
    console.error("CLICKEDDDDDD")
    chrome.runtime.sendMessage('get-all-places', (response) => {
        // 3. Got an asynchronous response with the data from the background
        console.log('received user data', response);

    });
    let tabID = -1;
    // Querying browser tab
    let querying = browser.tabs.query({ currentWindow: true, active: true });
    querying.then(logTabs, onError).then(() => {

        // Executing script
        const executing = browser.tabs.executeScript(tabID, {
            file: "/fillPlaces.js"

        });
        executing.then(onExecuted, onError);

    });

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
});

//init(); //.catch(e => console.error(e));
console.log("popup.js done");