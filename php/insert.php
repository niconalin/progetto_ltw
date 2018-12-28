<?php

    //CONTROLLA SE E' UNA RICHIESTA AJAX
    function is_ajax() {
        return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
    }

    //INSERICE RICETTA RICEVUTA NEL DATABASE
    if (is_ajax()) {
        if (isset($_POST["nome"]) && isset($_POST["tipo_piatto"]) && isset($_POST["ing_principale"]) && 
            isset($_POST["persone"]) && isset($_POST["ingredienti"]) && isset($_POST["preparazione"])) {
                $dbconn =   pg_connect("host = localhost port = 5432 dbname = Ricette user = postgres password = 0112") or die("Could not connect: " . pg_last_error());
                $nome           =   $_POST["nome"];
                $tipo_piatto    =   $_POST["tipo_piatto"];
                $ing_principale =   $_POST["ing_principale"];
                $persone        =   $_POST["persone"];
                $note           =   $_POST["note"];
                $ingredienti    =   $_POST["ingredienti"];
                $preparazione   =   $_POST["preparazione"];
                pg_prepare($dbconn, "insert", "INSERT INTO Ricette(nome, tipo_piatto, ing_principale, persone, note, ingredienti, preparazione) VALUES(\$1, \$2, \$3, \$4, \$5, \$6, \$7)");       
                $result = pg_execute($dbconn, "insert", array($nome, $tipo_piatto, $ing_principale, $persone, $note, $ingredienti, $preparazione)) or die("Query failed:" . pg_last_error());
                pg_close($dbconn);
                pg_free_result($result);
                $return = "success";
                echo json_encode($return);
        }
    }
?>