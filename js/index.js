/*###########################################################################################################################*/

//ESEGUE RICERCA PER RICETTE RANDOM PASSANDO PARAMETRI A PHP

function searchAll() {
    var data = {
        "action": "search-all",
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

//ELABORA RISULTATI QUERY PER RICETTE RANDOM

function stampaRisultati(data) {

    var ricette = [];
    ricette["nome"] = JSON.parse(data["nome"]);
    ricette["tipo_piatto"] = JSON.parse(data["tipo_piatto"]);
    ricette["ing_principale"] = JSON.parse(data["ing_principale"]);
    ricette["persone"] = JSON.parse(data["persone"]);
    ricette["note"] = JSON.parse(data["note"]);
    ricette["ingredienti"] = JSON.parse(data["ingredienti"]);
    ricette["preparazione"] = JSON.parse(data["preparazione"]);

    var nomi = ricette["nome"];
    var tipo_piatto = ricette["tipo_piatto"];
    var ing_principale = ricette["ing_principale"];
    var persone = ricette["persone"];
    var ingredienti = ricette["ingredienti"];
    var preparazione = ricette["preparazione"];
    var random_ricette = [];
    var ricetta;
    var tmp_array = [];
    var tmp_string = "";

    for (i = 1; i <= 6; i++) {
        ricetta = $("#r" + i);
        ricetta.find("#h" + i).html(nomi[i-1]);
        tmp_array = ingredienti[i-1].split('+');
        tmp_string = "Tipo Piatto: " + tipo_piatto[i-1] + "<br>" +
            "Ingrediente Principale: " + ing_principale[i-1] + "<br>" +
            "Persone: " + persone[i-1] + "<br><br>" +
            "Ingredienti: " + "<br>";
        for (k = 0; k < tmp_array.length; k++) {
            tmp_string = tmp_string + tmp_array[k] + "<br>";
        }
        tmp_string = tmp_string + "Preparazione: " + preparazione[i-1];
        random_ricette.push(tmp_string);
    }

    random_ricette = JSON.stringify(random_ricette);
    sessionStorage.setItem("random_ricette", random_ricette);
}

/*###########################################################################################################################*/

//READY

$(document).ready(function () {
    
    $("#close").hide();
    $("#ricetta-random-nome").hide();
    $("#ricetta-random").hide();

    searchAll();

    $("body").fadeIn(1000);

    //MOSTRA RICETTA RANDOM SCELTA CLICCANDO

    $("#r1").click(function () {
        $("#cover").hide();
        $(".container").hide();

        var tmp = JSON.parse(sessionStorage.getItem("random_ricette"));
        $("#ricetta-random-nome").html($("#h1").html());
        $("#ricetta-random").html(tmp[0]);

        $(window).scrollTop(0);

        $("#close").fadeIn(500);
        $("#ricetta-random-nome").fadeIn(500);
        $("#ricetta-random").fadeIn(500);
    });

    $("#r2").click(function () {
        $("#cover").hide();
        $(".container").hide();

        var tmp = JSON.parse(sessionStorage.getItem("random_ricette"));
        $("#ricetta-random-nome").html($("#h2").html());
        $("#ricetta-random").html(tmp[1]);

        $(window).scrollTop(0);

        $("#close").fadeIn(500);
        $("#ricetta-random-nome").fadeIn(500);
        $("#ricetta-random").fadeIn(500);
    });

    $("#r3").click(function () {
        $("#cover").hide();
        $(".container").hide();

        var tmp = JSON.parse(sessionStorage.getItem("random_ricette"));
        $("#ricetta-random-nome").html($("#h3").html());
        $("#ricetta-random").html(tmp[2]);

        $(window).scrollTop(0);

        $("#close").fadeIn(500);
        $("#ricetta-random-nome").fadeIn(500);
        $("#ricetta-random").fadeIn(500);
    });

    $("#r4").click(function () {
        $("#cover").hide();
        $(".container").hide();

        var tmp = JSON.parse(sessionStorage.getItem("random_ricette"));
        $("#ricetta-random-nome").html($("#h4").html());
        $("#ricetta-random").html(tmp[3]);

        $(window).scrollTop(0);

        $("#close").fadeIn(500);
        $("#ricetta-random-nome").fadeIn(500);
        $("#ricetta-random").fadeIn(500);
    });

    $("#r5").click(function () {
        $("#cover").hide();
        $(".container").hide();

        var tmp = JSON.parse(sessionStorage.getItem("random_ricette"));
        $("#ricetta-random-nome").html($("#h5").html());
        $("#ricetta-random").html(tmp[4]);

        $(window).scrollTop(0);

        $("#close").fadeIn(500);
        $("#ricetta-random-nome").fadeIn(500);
        $("#ricetta-random").fadeIn(500);
    });

    $("#r6").click(function () {
        $("#cover").hide();
        $(".container").hide();

        var tmp = JSON.parse(sessionStorage.getItem("random_ricette"));
        $("#ricetta-random-nome").html($("#h6").html());
        $("#ricetta-random").html(tmp[5]);

        $(window).scrollTop(0);

        $("#close").fadeIn(500);
        $("#ricetta-random-nome").fadeIn(500);
        $("#ricetta-random").fadeIn(500);
    });

    //CHIUDE RICETTA RANDOM E TORNA A HOME SENZA RICARICARE PAGINA

    $("#close").on("click", function () {
        $("#close").hide();
        $("#ricetta-random-nome").hide();
        $("#ricetta-random").hide();
        
        $("#cover").fadeIn(500);
        $(".container").fadeIn(500);
    });
});

/*###########################################################################################################################*/