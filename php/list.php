<?php
/**
 * Returns the list of cars.
 */
require 'connect.php';
$ph=[];    
$phones = [];
$sql1="SELECT name,count(name) from amazon1 group by name";
$result1 = mysqli_query($con,$sql1);
$cr1=0;
while($row = mysqli_fetch_assoc($result1))
  {
    $ph[$cr1]['name'] = $row['name'];
    $cr1++;
    //echo $row['name'];
  }

//echo $ph[0]['name'];
//echo $ph[1]['name'];
$j=0;
//$i=0;
while($j<sizeof($ph)){
  // echo $i;
  $x=$ph[$j]['name'];
  //var_dump($x);
  // echo $row['name'];
  // echo $x;
  $sql="SELECT * from amazon1 where name='$x'";
  $result = mysqli_query($con,$sql);
  $phones = [];
  $i=0;
  while($row = mysqli_fetch_assoc($result)){
    //echo $row['name'];

    $phones[$i]['name'] = $row['name'];
    $phones[$i]['color']  = $row['color'];
    $phones[$i]['space'] = $row['space'];
    $phones[$i]['price'] = $row['price'];
    $phones[$i]['rating'] = $row['rating'];
    $phones[$i]['company'] = $row['company'];
    $phones[$i]['link'] = $row['link'];
    $phones[$i]['photo'] = $row['photo'];
    $i++;
    //echo $phones;
    //echo "---------------------------------------";
  
}
$phones1[$x]=$phones;
$phkeys[$j]=$x;
$j++;
}

echo json_encode(['data'=>$phones1]);
 /*echo "---------------------------------------";
 
 $sql = "SELECT name,color,space,price,rating,company FROM amazon1";

 if($result = mysqli_query($con,$sql))
{
   $cr = 0;
   while($row = mysqli_fetch_assoc($result))
   {

     $phones[$cr]['name'] = $row['name'];
     $phones[$cr]['color']  = $row['color'];
     $phones[$cr]['space'] = $row['space'];
     $phones[$cr]['price'] = $row['price'];
     $phones[$cr]['rating'] = $row['rating'];
     $phones[$cr]['company'] = $row['company'];

     $cr++;
   }
    
   echo json_encode(['data'=>$phones]);
 }
 else
 {
   http_response_code(404);
 }*/
?>