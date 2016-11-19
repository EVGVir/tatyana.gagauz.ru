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

    mainMenu_expandCurrentTarget();

    return true;
}


// Expands main menu part that contains current #target.
function mainMenu_expandCurrentTarget() {
    var nav = document.getElementById("main-menu");
    var anchors = nav.getElementsByTagName("a");

    for (var i = 0; i < anchors.length; i++) {
        if (anchors[i].getAttribute("href") == window.location.hash) {
            mainMenu_expand(anchors[i].parentNode.parentNode.parentNode);
            break;
        }
    }
}


// Collapses all items in the main menu.
function mainMenu_collapseAllItems() {
    var nav = document.getElementById("main-menu");
    var items = nav.getElementsByClassName("expandable");
    for (var i = 0; i < items.length; i++) {
        items[i].classList.remove("expanded");
    }
}


// Expands an item in the main menu and collapses all other.
//
// item - an element of class 'expandable' to be expanded.
function mainMenu_expand(item) {
    mainMenu_collapseAllItems();
    item.classList.add("expanded");
}
