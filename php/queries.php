<?php
    
    //SCEGLIE QUALE RICERCA ESEGUIRE IN BASE A RICHIESTA CLIENT
    if (is_ajax()) {
        if (isset($_POST["action"]) && !empty($_POST["action"])) {
            $action = $_POST["action"];
            switch($action) {
                case "search-piatto":       ricercaPiatto(); break;
                case "search-ingredienti":  ricercaIngredienti(); break;
                case "search-all":          ricercaTutto(); break;
            }
        }
    }

    //CONTROLLA SE E' UNA RICHIESTA AJAX
    function is_ajax() {
        return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
    }

    //CERCA PER PIATTO
    function ricercaPiatto(){
        $piatto = $_POST["piatto"];
        $filtri = json_decode($_POST["filtri"], true);
        $filtri_query = "";
        $tipo_piatto = $filtri["tipo_piatto"];
        if ($tipo_piatto != "") {
            $filtri_query = $filtri_query . "and tipo_piatto = '$tipo_piatto' ";
        }
        $persone = $filtri["persone"];
        if ($persone != "") {
            if ($persone == "10") {
                $filtri_query = $filtri_query . "and persone >= $persone ";
            }
            else {
                $filtri_query = $filtri_query . "and persone = $persone ";
            }
        }
        $iniziale = $filtri["iniziale"];
        if ($iniziale != "none") {
            $filtri_query = $filtri_query . "and nome LIKE '$iniziale%' ";
        }
        $dbconn =   pg_connect("host = localhost port = 5432 dbname = Ricette user = postgres password = 0112") or die("Could not connect: " . pg_last_error());
        $query  =   "SELECT * FROM Ricette WHERE nome LIKE '%$piatto%' " . $filtri_query;            
        $result =   pg_query($query) or die("Query failed:" . pg_last_error());
        pg_close($dbconn);
        $return["nome"]             = [];
        $return["tipo_piatto"]      = []; 
        $return["ing_principale"]   = [];  
        $return["persone"]          = []; 
        $return["note"]             = []; 
        $return["ingredienti"]      = []; 
        $return["preparazione"]     = []; 
        while ($row = pg_fetch_array($result, null, PGSQL_ASSOC)) {
            array_push($return["nome"],             $row["nome"]);
            array_push($return["tipo_piatto"],      $row["tipo_piatto"]); 
            array_push($return["ing_principale"],   $row["ing_principale"]);  
            array_push($return["persone"],          $row["persone"]); 
            array_push($return["note"],             $row["note"]); 
            array_push($return["ingredienti"],      $row["ingredienti"]); 
            array_push($return["preparazione"],     $row["preparazione"]); 
        }
        pg_free_result($result);
        $return["nome"]             = json_encode($return["nome"]);
        $return["tipo_piatto"]      = json_encode($return["tipo_piatto"]); 
        $return["ing_principale"]   = json_encode($return["ing_principale"]);  
        $return["persone"]          = json_encode($return["persone"]); 
        $return["note"]             = json_encode($return["note"]); 
        $return["ingredienti"]      = json_encode($return["ingredienti"]);
        $return["preparazione"]     = json_encode($return["preparazione"]);
        echo json_encode($return);
    }

    //CERCA PER INGREDIENTI
    function ricercaIngredienti() {
        $lista_ingredienti = json_decode($_POST["ingredienti"]);
        $filtri = json_decode($_POST["filtri"], true);
        $query = "SELECT * FROM Ricette WHERE ";
        for($i = 0; $i < sizeof($lista_ingredienti); $i++) {
            if ($i == 0) {
                $tmp = $lista_ingredienti[$i];
                $query = $query . "ingredienti LIKE '%$tmp%' ";
            }
            else {
                $tmp = $lista_ingredienti[$i];
                $query = $query . "and ingredienti LIKE '%$tmp%' ";
            }
        }
        $filtri_query = "";
        $tipo_piatto = $filtri["tipo_piatto"];
        if ($tipo_piatto != "") {
            $filtri_query = $filtri_query . "and tipo_piatto = '$tipo_piatto' ";
        }
        $persone = $filtri["persone"];
        if ($persone != "") {
            if ($persone == "10+") {
                $filtri_query = $filtri_query . "and (";
                for ($i = 10; $i < 50; $i++) {
                    if ($i == 10) {
                        $filtri_query = $filtri_query . "persone = '$i' ";
                    }
                    else {
                        $filtri_query = $filtri_query . "or persone = '$i'";
                    }
                }
                $filtri_query = $filtri_query . ")";

            }
            else {
                $filtri_query = $filtri_query . "and persone = '$persone' ";
            }
        }
        $iniziale = $filtri["iniziale"];
        if ($iniziale != "") {
            $filtri_query = $filtri_query . "and nome LIKE '$iniziale%' ";
        }
        $query  = $query . $filtri_query;
        $dbconn =   pg_connect("host = localhost port = 5432 dbname = Ricette user = postgres password = 0112") or die("Could not connect: " . pg_last_error());      
        $result =   pg_query($query) or die("Query failed:" . pg_last_error());
        pg_close($dbconn);
        $return["nome"]             = [];
        $return["tipo_piatto"]      = []; 
        $return["ing_principale"]   = [];  
        $return["persone"]          = []; 
        $return["note"]             = []; 
        $return["ingredienti"]      = []; 
        $return["preparazione"]     = []; 
        while ($row = pg_fetch_array($result, null, PGSQL_ASSOC)) {
            array_push($return["nome"],             $row["nome"]);
            array_push($return["tipo_piatto"],      $row["tipo_piatto"]); 
            array_push($return["ing_principale"],   $row["ing_principale"]);  
            array_push($return["persone"],          $row["persone"]); 
            array_push($return["note"],             $row["note"]); 
            array_push($return["ingredienti"],      $row["ingredienti"]); 
            array_push($return["preparazione"],     $row["preparazione"]); 
        }
        pg_free_result($result);
        $return["nome"]             = json_encode($return["nome"]);
        $return["tipo_piatto"]      = json_encode($return["tipo_piatto"]); 
        $return["ing_principale"]   = json_encode($return["ing_principale"]);  
        $return["persone"]          = json_encode($return["persone"]); 
        $return["note"]             = json_encode($return["note"]); 
        $return["ingredienti"]      = json_encode($return["ingredienti"]);
        $return["preparazione"]     = json_encode($return["preparazione"]);
        echo json_encode($return);
    }

    //PRENDE TUTTE LE RICETTE E NE SCEGLIE 6 RANDOM
    function ricercaTutto() {
        $dbconn =   pg_connect("host = localhost port = 5432 dbname = Ricette user = postgres password = 0112") or die("Could not connect: " . pg_last_error());
        $query  =   "SELECT * FROM Ricette";            
        $result =   pg_query($query) or die("Query failed:" . pg_last_error());
        pg_close($dbconn);
        $array["nome"]             = [];
        $array["tipo_piatto"]      = []; 
        $array["ing_principale"]   = [];  
        $array["persone"]          = []; 
        $array["note"]             = []; 
        $array["ingredienti"]      = []; 
        $array["preparazione"]     = []; 
        while ($row = pg_fetch_array($result, null, PGSQL_ASSOC)) {
            array_push($array["nome"],             $row["nome"]);
            array_push($array["tipo_piatto"],      $row["tipo_piatto"]); 
            array_push($array["ing_principale"],   $row["ing_principale"]);  
            array_push($array["persone"],          $row["persone"]); 
            array_push($array["note"],             $row["note"]); 
            array_push($array["ingredienti"],      $row["ingredienti"]); 
            array_push($array["preparazione"],     $row["preparazione"]); 
        }
        pg_free_result($result);
        $return["nome"]             = [];
        $return["tipo_piatto"]      = []; 
        $return["ing_principale"]   = [];  
        $return["persone"]          = []; 
        $return["note"]             = []; 
        $return["ingredienti"]      = []; 
        $return["preparazione"]     = []; 
        for ($i=0; $i<6; $i++) {
            $random = rand(0, count($array["nome"])-1);
            $return["nome"][$i] = $array["nome"][$random];
            $return["tipo_piatto"][$i] = $array["tipo_piatto"][$random];
            $return["ing_principale"][$i] = $array["ing_principale"][$random];
            $return["persone"][$i] = $array["persone"][$random];
            $return["note"][$i] = $array["note"][$random];
            $return["ingredienti"][$i] = $array["ingredienti"][$random];
            $return["preparazione"][$i] = $array["preparazione"][$random];
        }
        $return["nome"]             = json_encode($return["nome"]);
        $return["tipo_piatto"]      = json_encode($return["tipo_piatto"]); 
        $return["ing_principale"]   = json_encode($return["ing_principale"]);  
        $return["persone"]          = json_encode($return["persone"]); 
        $return["note"]             = json_encode($return["note"]); 
        $return["ingredienti"]      = json_encode($return["ingredienti"]);
        $return["preparazione"]     = json_encode($return["preparazione"]);
        echo json_encode($return);
    }
?>
