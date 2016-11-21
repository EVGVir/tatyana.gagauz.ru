// Prepares the site by:
// - loading a poem and openning the main menu if a #target is set; and
// - installing global event listeners.
function onLoad() {
    loadContent();

    window.addEventListener("hashchange", loadContent, false);
    window.addEventListener("resize", mainMenu_expandCurrentTarget, false);
    window.addEventListener("keydown", navigate);
}


// Loads a poem into the 'content' container.
function loadPoem(poem) {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
                document.getElementById("content").innerHTML =
                    '<div id="poem">' + xmlhttp.responseText + '</div>' +
                    generateNavigation();
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
        items[i].style.height = 0;
    }
}


// Expands an item in the main menu and collapses all other.
//
// item - a parent of an element of class 'expandable' to be expanded.
function mainMenu_expand(item) {
    mainMenu_collapseAllItems();

    var ul = item.children[0];
    var listItems = ul.children;
    var height = 0;

    for (var listItemsIx = 0; listItemsIx < listItems.length; ++listItemsIx) {
        height += listItems[listItemsIx].offsetHeight || 0;
    }

    ul.style.height = height + "px";
}


// Generates navigation buttons to navigate through poems.
function generateNavigation() {
    var result;
    var links = getNavigationLinks();

    result = '<div id="poems-navigation" class="no-print">';
    if (links.prev) result += '<a id="next-poem" href="' + links.prev +'">&larr;</a>';
    result += " Ctrl "
    if (links.next) result += '<a id="prev-poem" href="' + links.next +'">&rarr;</a>';
    result += '</div>';

    return result;
}


// Returns links for navigation between poems:
// - result.prev - link to the previous poem; and
// - result.next - link to the next poem.
function getNavigationLinks() {
    var result = {prev: null, next: null};
    var nav = document.getElementById('main-menu');
    var anchors = nav.getElementsByTagName("a");

    for (var i = 0; i < anchors.length; i++) {
        if (anchors[i].getAttribute('href') == window.location.hash) {
            result.prev = i > 0                  ? anchors[i - 1].getAttribute('href') : null;
            result.next = i < anchors.length - 1 ? anchors[i + 1].getAttribute('href') : null;
            break;
        }
    }
    return result;
}


// Navigates between poems by reacting on key down events (Ctrl + Left
// and Ctrl + Right) and using links from the #poems-navigator
// container.
function navigate(event) {
    if (event.ctrlKey) {
        var anchor;
        switch (event.keyCode) {
            case 0x25: anchor = document.getElementById('next-poem'); break;
            case 0x27: anchor = document.getElementById('prev-poem'); break;
        }
        if (anchor && anchor.href) document.location = anchor.href;
    }
}
