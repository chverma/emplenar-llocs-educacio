let input = document.querySelector('#sepia_range');
let rowsResult = []
input.addEventListener('change', e => {
    e.target.value
});

async function init() {

    let {sepiaLevel}  = browser.storage.local.get('sepiaLevel');
    let {centerPlaces} = browser.storage.local.get('centerPlaces');
    console.log("init", sepiaLevel, centerPlaces)
    if (!sepiaLevel) {
        sepiaLevel = {};
        sepiaLevel.name = 'sepiaLevel'
        sepiaLevel.value = 0
    }
    if (!centerPlaces) {
        centerPlaces = {};
        centerPlaces.name = 'centerPlaces'
        centerPlaces.value = {}
    }

    input.value = sepiaLevel.value;

    await browser.storage.local.set({sepiaLevel, centerPlaces});
    console.log("init__", browser.storage.local.get('sepiaLevel').item)
}

init().catch(e => console.error(e));

let buttonRun = document.querySelector('#run_btn');
buttonRun.addEventListener('click', () => {
    function getAllPlaces(postalCode) {
    let url = `http://decasaalcole.cartodb.com/api/v2/sql?q=with ftimes as (select cp_to cp, from_dist dist, from_time atime from times where cp_from = '${postalCode}'), ttimes as (select cp_from cp, to_dist dist, to_time atime from times where cp_to = '${postalCode}'), totaltimes as (select * from ftimes union select * from ttimes union select '${postalCode}' cp, 0 dist, 0 atime) select c.cartodb_id, c.the_geom, ST_astext(c.the_geom) as tgeom, c.the_geom_webmercator, c.regimen, c.dgenerica, c.dabreviada, c.localidad, c.tipocalle, c.direccion, c.numero, c.codigo, ((t.atime)/60)::integer minutes, (t.dist/1000)::integer kms from coles_cp2 c join totaltimes t on c.cp = t.cp WHERE regimen = true AND ( nived like '%25F%25' or nived like '%25E%25' or nived like '%25D%25' ) order by t.atime, t.dist` 
        var xmlhttp = new XMLHttpRequest();
    
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == XMLHttpRequest.DONE) { // XMLHttpRequest.DONE == 4
                if (xmlhttp.status == 200) {
                    rowsResult = JSON.parse(xmlhttp.responseText).rows;
                    setValue('prova', 'provaCOnt')
                    let querying = browser.tabs.query({ currentWindow: true, active: true });
                    querying.then(logTabs, onError).then(() => {
    
                        
                        const executing = browser.tabs.executeScript(tabID, {
                            file: "/fillPlaces.js"
                            
                        });
                        executing.then(onExecuted, onError);

                    });
                } else if (xmlhttp.status == 400) {
                    alert('There was an error 400');
                } else {
                    alert('something else other than 200 was returned');
                }
            }
        };
        xmlhttp.open('GET',url);
        xmlhttp.setRequestHeader('Access-Control-Allow-Origin','*')
        xmlhttp.send()
    }
    
    getAllPlaces(46812);
  
 
    let tabID = -1;
    function logTabs(tabs) {
        // tabs[0].url requires the `tabs` permission or a matching host permission.
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
