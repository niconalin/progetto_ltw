/*###########################################################################################################################*/

//ESEGUE RICERCA PER PIATTO PASSANDO PARAMETRI QUERY A PHP

function searchForPiatto() {

    var piatto = sessionStorage.getItem("searchedPiatto");
    $("#searched").html(piatto.toUpperCase());
    var parole = piatto.trim().split(" ");
    piatto = "";
    for (i = 0; i < parole.length; i++) {   //modifica dovuta alla struttura del database
        if (i != parole.length - 1) {
            piatto += parole[i].charAt(0).toUpperCase() + parole[i].slice(1, parole[i].length) + " ";
        }
        else {
            piatto += parole[i].charAt(0).toUpperCase() + parole[i].slice(1, parole[i].length - 1);
        }
    }
    var data = {
        "action": "search-piatto",
        "piatto": piatto,
        "filtri": sessionStorage.getItem("filtri")
    }

    $.ajax({
        type: "POST",
        dataType: "json",
        url: "../php/queries.php",
        data: data,
        success: function (data) {
            stampaRisultati(data);
        },
        error: function () {
            alert("ERROR");
        }
    });
}

/*###########################################################################################################################*/

//ESEGUE RICERCA PER INGREDIENTI PASSANDO PARRAMETRI QUERY A PHP

function searchForIngredienti() {
    var lista_ingredienti = JSON.parse(sessionStorage.getItem("lista_ingredienti"));
    var ingredienti_cercati = "";
    var tmp = "";

    for (i = 0; i < lista_ingredienti.length; i++) {
        tmp = lista_ingredienti[i].toUpperCase();
        ingredienti_cercati += tmp.toUpperCase() + "<br>"
        lista_ingredienti[i] = lista_ingredienti[i].charAt(0).toUpperCase() + lista_ingredienti[i].slice(1, lista_ingredienti[i].length);
    }

    $("#searched").html(ingredienti_cercati);

    var data = {
        "action": "search-ingredienti",
        "ingredienti": JSON.stringify(lista_ingredienti),
        "filtri": sessionStorage.getItem("filtri")
    }

    $.ajax({
        type: "POST",
        dataType: "json",
        url: "../php/queries.php",
        data: data,
        success: function (data) {
            stampaRisultati(data);
        },
        error: function () {
            alert("ERROR");
        }
    });
}

/*###########################################################################################################################*/

//ELABORA RISULTATI QUERY STAMPANDOLI

function stampaRisultati(data) {

    $("#ricette").html("");

    ricette["nome"] = JSON.parse(data["nome"]);
    ricette["tipo_piatto"] = JSON.parse(data["tipo_piatto"]);
    ricette["ing_principale"] = JSON.parse(data["ing_principale"]);
    ricette["persone"] = JSON.parse(data["persone"]);
    ricette["note"] = JSON.parse(data["note"]);
    ricette["ingredienti"] = JSON.parse(data["ingredienti"]);
    ricette["preparazione"] = JSON.parse(data["preparazione"]);

    var count = 0;

    for (i = 0; i < ricette["nome"].length; i++) {

        count++;

        var card = document.createElement("div");
        card.setAttribute("class", "card card-ricetta");

        var card_header = document.createElement("div");
        card_header.setAttribute("class", "card-header");
        card_header.setAttribute("id", i);

        var h6 = document.createElement("h6");

        var button = document.createElement("button");
        button.setAttribute("class", "btn collapsed btn-filtri filtri_text");
        button.setAttribute("data-toggle", "collapse");
        button.setAttribute("data-target", "#sotto" + i);
        button.setAttribute("aria-expanded", "false");
        button.setAttribute("aria-controls", "sotto" + i);


        var collapse = document.createElement("div");
        collapse.setAttribute("id", "sotto" + i);
        collapse.setAttribute("class", "collapse");
        collapse.setAttribute("aria-labelledby", i);
        collapse.setAttribute("data-parent", "#ricette");

        var card_body = document.createElement("div");
        card_body.setAttribute("class", "card-body");

        button.innerHTML = ricette["nome"][i];
        h6.appendChild(button);
        card_header.appendChild(h6);
        card.appendChild(card_header);

        var ingredienti = ricette["ingredienti"][i].split('+');
        var tmp = "";

        for (k = 0; k < ingredienti.length; k++) {
            tmp = tmp + ingredienti[k] + "<br>";
        }

        card_body.innerHTML = "Tipo piatto: " + ricette["tipo_piatto"][i] + "<br>" + "Persone: " + ricette["persone"][i] + "<br>" +
            "Ingrediente Principale: " + ricette["ing_principale"][i] + "<br><br>" + tmp + "<br>" + ricette["preparazione"][i];
        collapse.appendChild(card_body);
        card.appendChild(collapse);

        $("#ricette").append(card);
    }

    if (count == 0) {
        var div = document.createElement("div");
        div.setAttribute("id", "ricerca_fallita");
        div.innerHTML = "Ci dispiace ma la tua ricerca non ha prodotto alcun risultato!";

        $("#ricette").append(div);
    }

    $("#num_risultati").html(count + " risultati");
};

/*###########################################################################################################################*/

//READY

$(document).ready(function () {
    
    var option = sessionStorage.getItem("option");
    $("#ricerca-per").html("Ricerca per " + option);

    switch (option) {
        case "piatto": searchForPiatto(); break;
        case "ingredienti": searchForIngredienti(); break;
        case null: break;
    }

    $("body").fadeIn(1000);

    /*###########################################################################################################################*/

    //GESTIONE FILTRI

    /*###########################################################################################################################*/

    //TIPO PIATTO

    $("#tutti").on("change", function () {
        if (this.checked) {
            var filtri = JSON.parse(sessionStorage.getItem("filtri"));
            filtri["tipo_piatto"] = "";
            sessionStorage.setItem("filtri", JSON.stringify(filtri));

            if (sessionStorage.getItem("option") == "piatto") {
                searchForPiatto();
            }
            else {
                searchForIngredienti();
            }
        }
    });

    $("#antipasto").on("change", function () {
        if (this.checked) {
            var filtri = JSON.parse(sessionStorage.getItem("filtri"));
            filtri["tipo_piatto"] = "Antipasto";
            sessionStorage.setItem("filtri", JSON.stringify(filtri));

            if (sessionStorage.getItem("option") == "piatto") {
                searchForPiatto();
            }
            else {
                searchForIngredienti();
            }
        }
    });

    $("#primo").on("change", function () {
        if (this.checked) {
            var filtri = JSON.parse(sessionStorage.getItem("filtri"));
            filtri["tipo_piatto"] = "Primo";
            sessionStorage.setItem("filtri", JSON.stringify(filtri));

            if (sessionStorage.getItem("option") == "piatto") {
                searchForPiatto();
            }
            else {
                searchForIngredienti();
            }
        }
    });

    $("#salsa").on("change", function () {
        if (this.checked) {
            var filtri = JSON.parse(sessionStorage.getItem("filtri"));
            filtri["tipo_piatto"] = "Salsa";
            sessionStorage.setItem("filtri", JSON.stringify(filtri));

            if (sessionStorage.getItem("option") == "piatto") {
                searchForPiatto();
            }
            else {
                searchForIngredienti();
            }
        }
    });

    $("#carne").on("change", function () {
        if (this.checked) {
            var filtri = JSON.parse(sessionStorage.getItem("filtri"));
            filtri["tipo_piatto"] = "Carne";
            sessionStorage.setItem("filtri", JSON.stringify(filtri));

            if (sessionStorage.getItem("option") == "piatto") {
                searchForPiatto();
            }
            else {
                searchForIngredienti();
            }
        }
    });

    $("#pesce").on("change", function () {
        if (this.checked) {
            var filtri = JSON.parse(sessionStorage.getItem("filtri"));
            filtri["tipo_piatto"] = "Pesce";
            sessionStorage.setItem("filtri", JSON.stringify(filtri));

            if (sessionStorage.getItem("option") == "piatto") {
                searchForPiatto();
            }
            else {
                searchForIngredienti();
            }
        }
    });

    $("#pollame").on("change", function () {
        if (this.checked) {
            var filtri = JSON.parse(sessionStorage.getItem("filtri"));
            filtri["tipo_piatto"] = "Pollame";
            sessionStorage.setItem("filtri", JSON.stringify(filtri));

            if (sessionStorage.getItem("option") == "piatto") {
                searchForPiatto();
            }
            else {
                searchForIngredienti();
            }
        }
    });

    $("#contorno").on("change", function () {
        if (this.checked) {
            var filtri = JSON.parse(sessionStorage.getItem("filtri"));
            filtri["tipo_piatto"] = "Contorno";
            sessionStorage.setItem("filtri", JSON.stringify(filtri));

            if (sessionStorage.getItem("option") == "piatto") {
                searchForPiatto();
            }
            else {
                searchForIngredienti();
            }
        }
    });

    $("#dessert").on("change", function () {
        if (this.checked) {
            var filtri = JSON.parse(sessionStorage.getItem("filtri"));
            filtri["tipo_piatto"] = "Dessert";
            sessionStorage.setItem("filtri", JSON.stringify(filtri));

            if (sessionStorage.getItem("option") == "piatto") {
                searchForPiatto();
            }
            else {
                searchForIngredienti();
            }
        }
    });

    $("#bevande").on("change", function () {
        if (this.checked) {
            var filtri = JSON.parse(sessionStorage.getItem("filtri"));
            filtri["tipo_piatto"] = "Bevande";
            sessionStorage.setItem("filtri", JSON.stringify(filtri));

            if (sessionStorage.getItem("option") == "piatto") {
                searchForPiatto();
            }
            else {
                searchForIngredienti();
            }
        }
    });

    /*###########################################################################################################################*/

    //NUMERO PERSONE

    $("#indifferente").on("change", function () {
        if (this.checked) {
            var filtri = JSON.parse(sessionStorage.getItem("filtri"));
            filtri["persone"] = "";
            sessionStorage.setItem("filtri", JSON.stringify(filtri));

            if (sessionStorage.getItem("option") == "piatto") {
                searchForPiatto();
            }
            else {
                searchForIngredienti();
            }
        }
    });

    $("#1").on("change", function () {
        if (this.checked) {
            var filtri = JSON.parse(sessionStorage.getItem("filtri"));
            filtri["persone"] = "1";
            sessionStorage.setItem("filtri", JSON.stringify(filtri));

            if (sessionStorage.getItem("option") == "piatto") {
                searchForPiatto();
            }
            else {
                searchForIngredienti();
            }
        }
    });

    $("#2").on("change", function () {
        if (this.checked) {
            var filtri = JSON.parse(sessionStorage.getItem("filtri"));
            filtri["persone"] = "2";
            sessionStorage.setItem("filtri", JSON.stringify(filtri));

            if (sessionStorage.getItem("option") == "piatto") {
                searchForPiatto();
            }
            else {
                searchForIngredienti();
            }
        }
    });

    $("#4").on("change", function () {
        if (this.checked) {
            var filtri = JSON.parse(sessionStorage.getItem("filtri"));
            filtri["persone"] = "4";
            sessionStorage.setItem("filtri", JSON.stringify(filtri));

            if (sessionStorage.getItem("option") == "piatto") {
                searchForPiatto();
            }
            else {
                searchForIngredienti();
            }
        }
    });

    $("#10").on("change", function () {
        if (this.checked) {
            var filtri = JSON.parse(sessionStorage.getItem("filtri"));
            filtri["persone"] = "10";
            sessionStorage.setItem("filtri", JSON.stringify(filtri));

            if (sessionStorage.getItem("option") == "piatto") {
                searchForPiatto();
            }
            else {
                searchForIngredienti();
            }
        }
    });

    /*###########################################################################################################################*/

    //INIZIALI

    $("#lettere").on("change", function () {
        var iniziale = $("#lettere").val();

        var filtri = JSON.parse(sessionStorage.getItem("filtri"));
        filtri["iniziale"] = iniziale;
        sessionStorage.setItem("filtri", JSON.stringify(filtri));

        if (sessionStorage.getItem("option") == "piatto") {
            searchForPiatto();
        }
        else {
            searchForIngredienti();
        }
    });

    //SCROLL TOP

    $("#scroll_top").on("click", function () {
        $("html").animate({scrollTop: 0}, 500);
    });

});

/*###########################################################################################################################*/