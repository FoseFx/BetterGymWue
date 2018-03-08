<?php
if($_GET['hash'] == 'true'){
    echo hash_file("sha256", "mirror.php");
    exit;
}

header('Access-Control-Allow-Origin: *');
header( 'Access-Control-Allow-Headers: authorization, Content-type, Accept-Charset, Accept' );
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Content-Type: text/html');

if (!function_exists('getallheaders'))
{
    function getallheaders()
    {
        $headers = array ();
        foreach ($_SERVER as $name => $value)
        {
            if (substr($name, 0, 5) == 'HTTP_')
            {
                $headers[str_replace(' ', '-', ucwords(strtolower(str_replace('_', ' ', substr($name, 5)))))] = $value;
            }
        }
        return $headers;
    }
}

$method = $_SERVER['REQUEST_METHOD'];

if($method == 'OPTIONS'){
    exit;
}

if ($_GET && $_GET['url']) {
    $headers = getallheaders();
    $headers_str = [];
    $url = $_GET['url'];

    foreach ( $headers as $key => $value){
        if($key == 'Host')
            continue;
        $headers_str[]=$key.":".$value;
    }

    $ch = curl_init($url);

    curl_setopt($ch,CURLOPT_URL, $url);
    if( $method !== 'GET') {
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
    }
    if($method == "PUT" || $method == "PATCH" || ($method == "POST" && empty($_FILES))) {
      $data_str = file_get_contents('php://input');
      curl_setopt($ch, CURLOPT_POSTFIELDS, $data_str);
      echo($method.': '.$data_str.serialize($_POST));
    }
    elseif($method == "POST") {
      $data_str = array();
      if(!empty($_FILES)) {
          foreach ($_FILES as $key => $value) {
              $full_path = realpath( $_FILES[$key]['tmp_name']);
              $data_str[$key] = '@'.$full_path;
          }
      }
      //error_log($method.': '.serialize($data_str+$_POST).'\n',3, 'err.log');
      echo($method.': '.serialize($data_str+$_POST).'\n');

      curl_setopt($ch, CURLOPT_POSTFIELDS, $data_str+$_POST);
    }

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt( $ch, CURLOPT_HTTPHEADER, $headers_str );

    $result = curl_exec($ch);
    if(curl_errno($ch)){
        echo 'Request Error:' . curl_error($ch);
    }

    $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    header('Access-Control-Allow-Origin: *');

    http_response_code($status);

    echo $result;
}
else {
    http_response_code(400);
}