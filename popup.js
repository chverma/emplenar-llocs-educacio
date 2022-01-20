let input = document.querySelector('#sepia_range');

input.addEventListener('change', e => setValue(e.target.value));

async function setValue(value) {
    await browser.storage.local.set({ value });
}

async function init() {

    let { value } = browser.storage.local.get('value');

    if (!value) {
        value = 0;
    }

    input.value = value;
    setValue(value);
}

init().catch(e => console.error(e));

let buttonRun = document.querySelector('#run_btn');
buttonRun.addEventListener('click', () => {

    /*browser.tabs.query({active: true}, function(tabs) {
        var tab = tabs[0];
        tab_title = tab.title;
        chrome.tabs.executeScript(tab.id, {
          code: 'document.querySelector(".afegir").click()'
        }, fakeFun);
      });
    */
    function fakeFun() {
        console.log("nothing")
    }
    let tabID = -1;
    function logTabs(tabs) {
        // tabs[0].url requires the `tabs` permission or a matching host permission.
        tabID = tabs[0].id;
        console.log(tabs[0].id)
    }

    function onError(error) {
        console.log(`Error: ${error}`);
    }
    function onExecuted(result) {
        console.log(`We made it green`);
    }
    let querying = browser.tabs.query({ currentWindow: true, active: true });
    querying.then(logTabs, onError).then(() => {



        const makeItGreen = 'document.querySelector(".afegir").click()';

        const executing = browser.tabs.executeScript(tabID, {
            file: "/fillPlaces.js"
        });
        executing.then(onExecuted, onError);
    });


});
