// Loads a poem into the 'content' container.
function loadPoem(poem) {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
                document.getElementById("content").innerHTML =
                    '<div id="poem">' + xmlhttp.responseText + '</div>';
            } else {
                document.getElementById("content").innerHTML = "Oops! 404!";
            }
        }
    }

    xmlhttp.open("GET", "poems/" + poem + ".html", true);
    xmlhttp.send();
}


// Loads a content into the 'content' container:
// - a main page (image) is loaded if there is no 'target';
// - a poem is loaded if a target is specified.
function loadContent() {
    var poem = window.location.hash.replace(/^#/, "");

    if (poem) {
        loadPoem(poem);
    } else {
        document.getElementById("content").innerHTML =
            '<img src="tatyana-gagauz.jpg" style="max-width:100%; width:100%"></img>';
        // `width` property is set to overcome a bug in the FireFox.
    }

    return true;
}
