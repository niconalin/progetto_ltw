/*###########################################################################################################################*/

//READY

$(document).ready(function () {
    
    sessionStorage.clear();
    $("body").fadeIn(1000);

    //INIZIA RICERCA DOPO VALIDAZIONE

    $("#searchPiatto").click(function () {
        var piatto = $("#searchBarPiatto").val();
        var tmp = $.trim(piatto);
        if (tmp == "") {
            window.alert("Errore: Inserire un piatto!");
            $("#searchBarPiatto").val("");
        }
        else if (!isNaN(piatto)){
            window.alert("Errore: Il nome del piatto non può essere un numero!");
            $("#searchBarPiatto").val("");
        }
        else {
            sessionStorage.setItem("searchedPiatto", piatto);
            var filtri = {
                "tipo_piatto": "",
                "persone": "",
                "iniziale": ""
            }
            sessionStorage.setItem("filtri", JSON.stringify(filtri));
            sessionStorage.setItem("option", "piatto");
            window.open("risultati.html", "_parent");
        }
    });
});

/*###########################################################################################################################*/