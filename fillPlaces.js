function fillPlace(place) {
    console.log("asdasd")
    document.querySelector(".afegir").click();
    let formulari_centres = document.querySelector("#formulari_centres");
    let lastPlace = formulari_centres.lastChild;
    let especialitat = lastPlace.querySelector('input[name="especialitat"')
    let centre = lastPlace.querySelector('input[name="centre"')
    centre.value = place.centre
    especialitat.value = place.especialitat
    centre.blur()
    especialitat.blur()
}

place = {};
place.especialitat = "107"
place.centre =  "46006100C"
fillPlace(place)
//document.querySelector("#guardarIcontinuar").click();