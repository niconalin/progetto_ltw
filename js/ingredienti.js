/*###########################################################################################################################*/

//CONTROLLO E STAMPA DEGLI INGREDIENTI CHE SI STANNO CERCANDO

function ingrediente_esistente(ingrediente) {
    var lista_ingredienti = JSON.parse(sessionStorage.getItem("lista_ingredienti"));
    for (i = 0; i < lista_ingredienti.length; i++) {
        if (ingrediente == lista_ingredienti[i]) return "true";
    }
    return "false";
}

function controlloSearchBarIngredienti(event) {
    if (event.which == 13 || event.keyCode == 13) {
        var ingrediente = $.trim($("#searchBarIngredienti").val());
        if (!isNaN(parseInt(ingrediente))) {
            window.alert("Errore: Gli ingredienti non possono essere numeri!");
        }
        else if (ingrediente == "") {
            window.alert("Errore: Inserire un ingrediente!");
        }
        else {
            var lista_scelte_div = document.getElementById("lista_scelte_div");
            if (sessionStorage.getItem("firstTime") == "true") {
                var titolo_ingredienti = document.createElement("h4");
                titolo_ingredienti.setAttribute("id", "titolo_ingredienti");
                titolo_ingredienti.innerHTML = "INGREDIENTI:";

                var ul = document.createElement("ul");
                ul.setAttribute("id", "lista_scelte");

                lista_scelte_div.appendChild(titolo_ingredienti);
                lista_scelte_div.appendChild(ul);

                sessionStorage.setItem("firstTime", 0);
            }
            if (ingrediente_esistente(ingrediente) == "false") {
                var lista_ingredienti = JSON.parse(sessionStorage.getItem("lista_ingredienti"));
                lista_ingredienti.push(ingrediente);
                sessionStorage.setItem("lista_ingredienti", JSON.stringify(lista_ingredienti));

                var ul = document.getElementById("lista_scelte");

                var li = document.createElement("li");
                li.setAttribute("class", "li");
                li.setAttribute("id", ingrediente);

                var label = document.createElement("label");
                label.innerHTML = ingrediente;

                var label_rm = document.createElement("label");
                label_rm.setAttribute("class", "remove");
                label_rm.setAttribute("value", ingrediente);
                label_rm.innerHTML = "−";

                li.appendChild(label);
                li.appendChild(label_rm);
                ul.appendChild(li);
            }
        }
        $("#searchBarIngredienti").val("");
    }
}

/*###########################################################################################################################*/

//READY

$(document).ready(function () {
    
    $("body").fadeIn(1000);

    sessionStorage.clear();
    sessionStorage.setItem("firstTime", "true");

    var lista_ingredienti = [];
    sessionStorage.setItem("lista_ingredienti", JSON.stringify(lista_ingredienti));

    //INZIA RICERCA

    $("#searchIngredienti").click(function () {
        var lista_ingredienti = sessionStorage.getItem("lista_ingredienti");
        if (lista_ingredienti == "[]" && $("#searchBarIngredienti").val() == "") {
            window.alert("Errore: Inserire almeno un ingrediente!");
            $("#searchBarIngredienti").val("");
        }
        else if (lista_ingredienti == "[]") {
            window.alert("Errore: Premere Invio per inserire un ingrediente!");
        }
        else {
            var filtri = {
                "tipo_piatto": "",
                "persone": "",
                "iniziale": ""
            }
            sessionStorage.setItem("filtri", JSON.stringify(filtri));
            sessionStorage.setItem("firstTime", "true");
            sessionStorage.setItem("option", "ingredienti");

            window.open("risultati.html", "_parent");
        }
    });

    //REMOVE INGREDIENTE

    $(document).on("click", ".remove", function () {
        var ingrediente = $(".remove").attr("value");

        var id_li = "#" + ingrediente;
        $(id_li).remove();

        var lista_ingredienti = JSON.parse(sessionStorage.getItem("lista_ingredienti"));

        for (i = 0; i < lista_ingredienti.length; i++) {
            if (lista_ingredienti[i] == ingrediente) {
                lista_ingredienti.splice(i, 1);
            }
        }
        sessionStorage.setItem("lista_ingredienti", JSON.stringify(lista_ingredienti));
    });
});

/*###########################################################################################################################*/