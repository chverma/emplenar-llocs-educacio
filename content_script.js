// define 2 objects
let sepiaLevel = {
    name: "sepiaLevel",
    value: 0
  }
  
  let centerPlaces = {
    name: "centerPlaces",
    value: {}
  }


let style = document.createElement('style');
document.body.appendChild(style);

browser.storage.onChanged.addListener((changes, area) => {

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
    console.log(`${item.sepiaLevel.name} has ${item.sepiaLevel.value}`);
    updateSepiaLevel(item.sepiaLevel.value)
  }
  
  function gotCenterPlaces(item) {
    console.log(`${item.centerPlaces.name} has ${JSON.stringify(item.centerPlaces.value)}`);
  }
  
  function onError(error) {
    console.log(error)
  }
  
  
  
  // store the objects
  browser.storage.local.set({sepiaLevel, centerPlaces})
    .then(setItem, onError);
  
  browser.storage.local.get("sepiaLevel")
    .then(gotSepiaLevel, onError);
  browser.storage.local.get("centerPlaces")
    .then(gotCenterPlaces, onError);
  