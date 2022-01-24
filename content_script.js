chrome.storage.onChanged.addListener((changes, area) => {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        console.log(
            `Storage key "${key}" in namespace "${area}" changed.`,
            `Old value was "${JSON.stringify(oldValue)}", new value is "${JSON.stringify(newValue)}".`
        );
    }
    console.log("changes: ", changes, area)
    if (area === 'local' && 'value' in changes) {
        if (changes.sepiaLevel.newValue.value != changes.sepiaLevel.oldValue.value)
            updateSepiaLevel(changes.sepiaLevel.newValue.value);
    }
});

function updateSepiaLevel(value) {
    console.log("updateSepiaLevel: ", value)
    style.innerText = `html { filter: sepia(${value}%) !important}`;
}

function setItem() {
    console.log("OK");
}

function gotSepiaLevel(item) {
    console.log(`${Object.keys(item)[0]} has ${item.sepiaLevel}`);
    updateSepiaLevel(item.sepiaLevel)
}

function gotCenterPlaces(item, sendResponse) {
    if (sendResponse)
        sendResponse(item.centerPlaces);
    console.log(`${Object.keys(item)[0]} has ${JSON.stringify(item.centerPlaces)}`);
}

function onError(error) {
    console.log(error)
}


// For sepia level
let style = document.createElement('style');
document.body.appendChild(style);

// define 2 objects
let sepiaLevel = {
    "sepiaLevel": 0
}

let centerPlaces = {
    "centerPlaces": {}
}

// store the objects
chrome.storage.local.set(sepiaLevel)
    .then(setItem, onError);
chrome.storage.local.set(centerPlaces)
    .then(setItem, onError);
// get the objects
chrome.storage.local.get("sepiaLevel")
    .then(gotSepiaLevel, onError);
chrome.storage.local.get("centerPlaces")
    .then(gotCenterPlaces, onError);



console.log("content script done")