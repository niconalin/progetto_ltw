/*###########################################################################################################################*/

//CREA FORM (SEZIONE INGREDIENTI)

function creaIngredienti(){
    var div = document.createElement("div");

    var label_ing =document.createElement("label");
    label_ing.setAttribute("class", "label_ingrediente");
    label_ing.innerHTML = "Ingrediente:";

    var ingrediente = document.createElement("input");
    ingrediente.setAttribute("class", "form-control ingrediente");
    ingrediente.setAttribute("type", "text");
    ingrediente.setAttribute("placeholder", "Inserisci ingrediente...");
    
    var label_qua =document.createElement("label");
    label_qua.setAttribute("class", "label_quantita");
    label_qua.innerHTML = "Quantità:";

    var quantita = document.createElement("input");
    quantita.setAttribute("class", "form-control quantita");
    quantita.setAttribute("type", "text");
    quantita.setAttribute("placeholder", "Inserisci quantità...");

    var add = document.createElement("div");
    add.setAttribute("class", "add");
    add.setAttribute("onclick", "addPressed(this)");
    add.innerHTML = "+";

    $("#ingredienti").prepend(div);
    $(div).prepend(add);
    $(div).prepend(quantita);
    $(div).prepend(label_qua);
    $(div).prepend(ingrediente);
    $(div).prepend(label_ing);
};

/*###########################################################################################################################*/

//REMOVE INGREDIENTE

function remove(elem){
    elem.parentNode.innerHTML = "";
}

function addPressed(elem) {
    creaIngredienti();
    elem.setAttribute("class", "clear");
    elem.setAttribute("onclick", "remove(this)");
    elem.innerHTML = "-";
};

/*###########################################################################################################################*/

//VALIDA FORM

function validaForm() {
    var nome = $("#nome").val();
    if (nome == "") {
        alert("Errore: inserire il nome!");
        return false;
    }
    if (!isNaN(nome)) {
        alert("Errore: il nome non può essere un numero!");
        $("#nome").val("");
        return false;
    }


    var tipo_piatto = $("#tipo_piatto").val();
    if (tipo_piatto == "none") {
        alert("Errore: inserire il tipo di piatto!");
        return false;
    }
    if (!isNaN(tipo_piatto)) {
        alert("Errore: il tipo del piatto non può essere un numero!");
        $("#tipo_piatto").val("");
        return false;
    }


    var ing_principale = $("#ing_principale").val();
    if (ing_principale == "") {
        alert("Errore: inserire l'ingrediente principale!");
        return false;
    }
    if (!isNaN(ing_principale)) {
        alert("Errore: l'ingrediente principale non può essere un numero!");
        $("#ing_principale").val("");
        return false;
    }


    var persone = $("#persone").val();
    if (persone == "") {
        alert("Errore: inserire il numero di persone!");
        return false;
    }
    if (isNaN(persone)) {
        alert("Errore: persone deve essere un numero!");
        $("#persone").val("");
        return false;
    }


    var note = $("#note").val();


    var ingredienti = [];
    $(".ingrediente").each(function() {
        if ($.trim($(this).val()) == "") {
            alert("Errore: inserire un ingrediente!");
            return false;
        }
    });
    $(".ingrediente").each(function() {
        ingredienti.push($(this).val());
    });

    var quantita = [];
    $(".quantita").each(function() {
        if ($.trim($(this).val()) == "") {
            alert("Errore: inserire la quantità!");
            return false;
        }
    });
    $(".quantita").each(function() {
        quantita.push($(this).val());
    });

    var ing_qua = "";
    for (i=0; i<ingredienti.length; i++) {
        var tmp = ingredienti[i]; 
        tmp = tmp.charAt(0).toUpperCase() + tmp.slice(1, tmp.length);
        ing_qua += quantita[i] + " ==== " + tmp + "+";
    }

    var preparazione = $("#preparazione").val();
    if (preparazione == "") {
        alert("Errore: inserire la preparazione!");
        return false;
    }
    if (!isNaN(preparazione)) {
        alert("Errore: la preparazionen non deve essere un numero!");
        $("#preparazione").val("");
        return false;
    }

    $("#nome").val("");
    $("#tipo_piatto").val("none");
    $("#ing_principale").val("");
    $("#persone").val("");
    $("#note").val("");
    $("#preparazione").val("");

    nome = nome.charAt(0).toUpperCase() + nome.slice(1, nome.length);
    ing_principale = ing_principale.charAt(0).toUpperCase() + ing_principale.slice(1, ing_principale.length);
    note = note.charAt(0).toUpperCase() + note.slice(1, note.length);
    preparazione = preparazione.charAt(0).toUpperCase() + preparazione.slice(1, preparazione.length);

    inviaForm(nome, tipo_piatto, ing_principale, persone, note, ing_qua, preparazione);
};

/*###########################################################################################################################*/

//INVIA FORM 

function inviaForm(nome, tipo_piatto, ing_principale, persone, note, ing_qua, preparazione) {

    var data = {
        "nome": nome,
        "tipo_piatto": tipo_piatto,
        "ing_principale": ing_principale,
        "persone": persone,
        "note": note,
        "ingredienti": ing_qua,
        "preparazione": preparazione
    };

    $.ajax({
        type: "POST",
        dataType: "json",
        url: "../php/insert.php",
        data: data,
        success: function (data) {
            if (data == "success") {
                $("#form_ricetta").hide();

                $("#invio_result").html("Ricetta inviata con successo! Grazie per la collaborazione!");

                $("#invio_result").fadeIn(400);
                $("#back").fadeIn(400);
            }
        },
        error: function () {
            $("#form_ricetta").hide();

            $("#invio_result").html("Ops...qualcosa è andato storto! Riprova ad inviare la ricetta :)");

            $("#invio_result").fadeIn(400);
            $("#back").fadeIn(400);
        }
    });
};

/*###########################################################################################################################*/

//READY

$(document).ready(function () {

    $("#invio_result").hide();
    $("#back").hide();

    $("body").fadeIn(1000);

    $("#back").on("click", function () {
        location.reload();
    });
});

/*###########################################################################################################################*/