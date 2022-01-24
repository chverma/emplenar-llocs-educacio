function init() {
    console.log("init1")
    chrome.storage.local.get('options', res => {
        var espName = res.options.espName;
        var espCode = res.options.espCode;
        var postalCode = res.options.postalCode;

        getAllPlaces(postalCode, espCode, espName)
    })

}

// Querying center places from postalCode
function getAllPlaces(postalCode, espCode, espName) {
    let url = `https://decasaalcole.cartodb.com/api/v2/sql?q=with ftimes as (select cp_to cp, from_dist dist, from_time atime from times where cp_from = '${postalCode}'), ttimes as (select cp_from cp, to_dist dist, to_time atime from times where cp_to = '${postalCode}'), totaltimes as (select * from ftimes union select * from ttimes union select '${postalCode}' cp, 0 dist, 0 atime) select c.cartodb_id, c.the_geom, ST_astext(c.the_geom) as tgeom, c.the_geom_webmercator, c.regimen, c.dgenerica, c.dabreviada, c.localidad, c.tipocalle, c.direccion, c.numero, c.codigo, ((t.atime)/60)::integer minutes, (t.dist/1000)::integer kms from coles_cp2 c join totaltimes t on c.cp = t.cp WHERE regimen = true AND ( nived like '%25F%25' or nived like '%25E%25' or nived like '%25D%25' ) order by t.atime, t.dist`
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) { // XMLHttpRequest.DONE == 4
            if (xmlhttp.status == 200) {
                rowsResult = JSON.parse(xmlhttp.response);
                //console.log(rowsResult);

                fillAllPlaces(rowsResult.rows, espCode, espName);
            } else if (xmlhttp.status == 400) {
                alert('There was an error 400');
            } else {
                alert('something else other than 200 was returned');
            }
        }
    };
    xmlhttp.open('GET', url);
    xmlhttp.setRequestHeader('Access-Control-Allow-Origin', '*')
    xmlhttp.send()
}

function fillAllPlaces(rows, espCode, espName) {
    place = {};
    place.especialitat = espCode;
    place.centre = '';
    codeAdded = [];
    for (var elem in rows) {
        var code = rows[elem].codigo.toString()
        var prefix = code.length < 8 ? '0' : ''

        place.centre = prefix + code + 'C';

        if (!codeAdded.includes(place.centre)) {
            fillPlace(place, espName);
            codeAdded.push(place.centre);
        }
    }
}
function fillPlace(place, espName) {
    //console.log("fillPlace")
    document.querySelector(".afegir").click();
    let formulari_centres = document.querySelector("#formulari_centres");
    let lastPlace = formulari_centres.lastChild;
    let especialitat = lastPlace.querySelector('input[name="especialitat"')
    let centre = lastPlace.querySelector('input[name="centre"')
    //var jso = document.defaultView.wrappedJSObject; //Access to foreign scripts variables

    centre.value = place.centre
    centre.classList.add("CENT")
    let span = document.createElement("span")

    verificarCentro(place.centre, span)
    span.classList.add('info')
    centre.parentElement.appendChild(span)

    especialitat.value = place.especialitat
    especialitat.parentElement.lastChild.innerText = espName
}

function verificarCentro(cod, span) {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) { // XMLHttpRequest.DONE == 4
            if (xmlhttp.status == 200) {
                //console.log(xmlhttp.responseText);
                var parser = new DOMParser();
                var doc = parser.parseFromString(xmlhttp.responseText, "application/xml");
                //console.log(doc.documentElement.children[3].innerHTML)
                if (doc.documentElement.children[3]) {
                    centerName = doc.documentElement.children[3].innerHTML;
                    span.innerText = centerName;
                }
            } else if (xmlhttp.status == 400) {
                alert('There was an error 400');
            } else {
                alert('something else other than 200 was returned');
            }
        }
    };
    //console.log("verificarCentro")
    vars = "codi=" + cod;

    var formData = new FormData();
    formData.append("codi", cod);

    xmlhttp.open("POST", "https://appweb.edu.gva.es/adjudicacio/verificarCentro.do" + "?" + vars);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.send(formData);
}




init()

console.log("fillPlaces.js done");