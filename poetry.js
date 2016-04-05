function loadPoem() {
    var xmlhttp = new XMLHttpRequest();

    var poem = window.location.hash.replace(/^#/, "");

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
                document.getElementById("content").innerHTML = xmlhttp.responseText;
            } else {
                document.getElementById("content").innerHTML = "Oops! 404!";
            }
        }
    }

    xmlhttp.open("GET", "poems/" + poem + ".html", true);
    xmlhttp.send();

    return true;
}
