<?php
function db_connect(){
    static $connection;
    $config = parse_ini_file('../../config.ini');
    $adminmail = $config["email"];

    if(!isset($connection)){
        $username = $config["user"];
        $password = $config["psw"];
        $dbname = $config["dbname"];

        $connection = mysqli_connect('localhost',$username,$password,$dbname);

    }
    if($connection === false) {
        fuck();
        return mysqli_connect_error();
    }
    return $connection;
}

function db_query($query){
    $connection = db_connect();
    $result = mysqli_query($connection, $query);
    return $result;
}

function db_select($query) {
    $rows = array();
    $result = db_query($query);

    if($result === false) {
        return false;
    }

    while ($row = mysqli_fetch_assoc($result)) {
        $rows[] = $row;
    }
    return $rows;
}

function fuck(){
    /*
    $config = parse_ini_file('../../config.ini');
    $adminmail = $config["email"];
    mail($adminmail, "msql Insert failed", "Strange?" );
    */

    $connection = db_connect();
    return mysqli_error($connection);
}



if(!isset($_GET["k"])) die("No");
$rows = db_select("SELECT id FROM pos WHERE available = 0 ORDER BY id ASC LIMIT 1");

if($rows === false){
    die(fuck());
}
$id = $rows[0]['id'];
$kurse = $_GET["k"];
$res = db_query("UPDATE pos SET id = $id, available = 1 WHERE (id = $id)");
if($res === false) die(fuck());

$stmt = mysqli_prepare(db_connect(), "INSERT INTO `kurse` (`id`, `wert`) VALUES ('$id', ?)");
mysqli_stmt_bind_param($stmt, "s", $kurse);
mysqli_stmt_execute($stmt);
mysqli_stmt_bind_result($stmt, $result);
mysqli_stmt_fetch($stmt);
mysqli_stmt_close($stmt);
mysqli_close(db_connect());

echo $id;