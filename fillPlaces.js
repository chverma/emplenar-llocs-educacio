function init() {
    for (var i = 0; i < localStorage.length; i++){
        console.log(localStorage.getItem(localStorage.key(i)));
    }
    let { rowsResult } = browser.storage.local.get('rows');

    if (!rowsResult) {
        rowsResult = {};
    }
    console.log(localStorage.length)
}


function fillPlace(place) {
    console.log("fillPlace")
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
    especialitat.parentElement.lastChild.innerHTML = "INFORMÀTICA"
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
                centerName = doc.documentElement.children[3].innerHTML
                span.innerHTML = centerName
            } else if (xmlhttp.status == 400) {
                alert('There was an error 400');
            } else {
                alert('something else other than 200 was returned');
            }
        }
    };
    console.log("verificarCentro")
    vars = "codi=" + cod;

    var formData = new FormData();
    formData.append("codi", cod);

    xmlhttp.open("POST", "https://appweb.edu.gva.es/adjudicacio/verificarCentro.do" + "?" + vars);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.send(formData);
}


place = {};
place.especialitat = "107"
place.centre = "46006100C"

init()
fillPlace(place)