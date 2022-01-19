let style = document.createElement('style');
document.body.appendChild(style);

browser.storage.onChanged.addListener((changes, area) => {

    if (area === 'local' && 'value' in changes) {

        update(changes.value.newValue);

    }
});

function update(value) {
    style.innerText = `html { filter: sepia(${value}%) !important}`;
}

browser.storage.local.get('value').then(result => update(result.value));


let input = document.querySelector('input');

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