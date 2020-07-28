<?php

/*header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept');

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);*/
require 'connect.php';
$sql1="TRUNCATE TABLE amazon1";
$result1 = mysqli_query($con,$sql1);
echo $result1;

$url='http://127.0.0.1:5000/api/v1/phones_update_1';

$ch = curl_init();

//$data=json_decode(file_get_contents("php://input"));
//echo $data;
//$POST1=json_decode($_POST);
//echo $POST1->name;
$arr1=array(
    'brand'  => 'vivo',//$_POST['data'],
);
//$arr1['brand']=$request->name;
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
	'Content-Type: application/json',
));

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$arr2 = json_encode($arr1);
curl_setopt($ch,CURLOPT_POST, true);

curl_setopt($ch, CURLOPT_POSTFIELDS, $arr2);


$data = curl_exec($ch);
echo $data;
// get info about the request
$info = curl_getinfo($ch);

// close curl resource to free up system resources 
curl_close($ch);
/*$status = array('status' => 1, );
echo json_encode($status);*/
?>
