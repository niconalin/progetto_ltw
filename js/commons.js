/*###########################################################################################################################*/

//READY (GESTIONE MENU)

$(document).ready(function () {

    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    }

    $(window).on("scroll", function () {
        var currentScrollPos = window.pageYOffset;
        if (currentScrollPos != 0) {
            document.getElementById("menu").style.top = "-4rem";
        }
        else {
            document.getElementById("menu").style.top = "0";
        }
    });

    $("#menu").on("mouseover", function () {
        if (window.pageYOffset != 0) {
            document.getElementById("menu").style.top = "0";
            $("#menu").css("background-color", "rgba(0, 0, 0, 0.8)");
            $(".marchio").css("color", "white");
        }
    });

    $("#menu").on("mouseleave", function () {
        if (window.pageYOffset != 0) {
            document.getElementById("menu").style.top = "-4rem";
            $("#menu").css("background-color", "rgba(0, 0, 0, 0.3)");
            $(".marchio").css("color", "black");
        }
    });
})

/*###########################################################################################################################*/
