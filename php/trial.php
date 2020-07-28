<?php


$url='http://127.0.0.1:5000/api/v1/phones_update_1';

$ch = curl_init();
$arr1=array(
    'brand'  => 'Apple iPhone 6S',
);
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
curl_close($ch)
?>
