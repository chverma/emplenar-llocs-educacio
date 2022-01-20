function fillPlace(place) {
    console.log("asdasd")
    document.querySelector(".afegir").click();
    let formulari_centres = document.querySelector("#formulari_centres");
    let lastPlace = formulari_centres.lastChild;
    let especialitat = lastPlace.querySelector('input[name="especialitat"')
    let centre = lastPlace.querySelector('input[name="centre"')
    var jso = document.defaultView.wrappedJSObject;
    centre.click()
        /*centre.onfocus = function(event) {
            console.log('focused');
            if (!centre.hasFocus()) {
                centre.focus();
                jso.Centre.capturar();
            }
        }*/
    centre.onblur = function(event) {
            console.log('blured');

            centre.blur();
            jso.Centre.verificar();

        }
        //jso.Centre.iniciar()
        //jso.Centre.capturar()
    centre.select()
    centre.focus()
    jso.Centre.capturar(centre);
    centre.value = place.centre
    centre.classList.add("CENT")
    let span = document.createElement("span")

    let name = toServer(jso, place.centre, span)
    console.log("name", name)
    span.classList.add('info')
    centre.parentElement.appendChild(span)
    centre.blur()
    jso.Centre.verificar(centre);
    //jso.Centre.verificar();
    //centre.blur()
    especialitat.value = place.especialitat
    especialitat.parentElement.lastChild.innerHTML = "INFORMÀTICA"

    //especialitat.blur()
}

function prova() {
    console.log("prova")
}
place = {};
place.especialitat = "107"
place.centre = "46006100C"
fillPlace(place)
    //document.querySelector("#guardarIcontinuar").click();

function toServer2(jso, cod) {
    console.log("toServer")
    vars = "codi=" + cod;
    jso.$.ajax({
        type: "POST",
        url: "verificarCentro.do",
        data: vars,
        dataType: "xml",
        beforeSend: function() {
            // abans d'enviar
            console.log("toServerAbans")
        },
        error: function() {
            Alerta.mostrar({ tipus: "alert", text: txtErrorOperacio });
            P_centres.find("input").removeAttr("disabled").removeClass("disabled");
            SPAN_centre.find("span.info").remove()
        },
        success: function(dades) {
            console.log(dades);
        }
    });
}

function toServer(jso, cod, span) {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) { // XMLHttpRequest.DONE == 4
            if (xmlhttp.status == 200) {
                console.log(xmlhttp.responseText);
                var parser = new DOMParser();
                var doc = parser.parseFromString(xmlhttp.responseText, "application/xml");
                console.log(doc.documentElement.children[3].innerHTML)
                centerName = doc.documentElement.children[3].innerHTML
                span.innerHTML = centerName
            } else if (xmlhttp.status == 400) {
                alert('There was an error 400');
            } else {
                alert('something else other than 200 was returned');
            }
        }
    };
    console.log("toServer")
    vars = "codi=" + cod;
    console.log("toServer_")

    var formData = new FormData();

    formData.append("codi", cod);
    console.log("toServer1", vars)
    console.log("toServer1", formData)

    xmlhttp.open("POST", "https://appweb.edu.gva.es/adjudicacio/verificarCentro.do" + "?" + vars);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    console.log("toServer2")
    xmlhttp.send(formData);
    console.log("toServer3")
}