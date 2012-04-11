<?php
include('../../openfoodmongo_authenticate.php');
connectMongo(true);

$collection = $m->openfood->foods;


// find everything in the collection
$cursor = $collection->find();

// @TODO load all files via an array.

/* $file_path = '../data/complete/openfood_4_7_12.json'; */
/* $file_path = '../data/complete/beer_style_category-tsv.json'; */
/* $file_path = '../data/complete/California-Rare-Fruit-List-Sheet1-csv.json'; */
/* $file_path = '../data/complete/cheese-tsv.json'; */
/* $file_path = '../data/complete/cucumber_varieties_seed_catalogs.json'; */
/* $file_path = '../data/complete/edible_plant-tsv.json'; */
/* $file_path = '../data/complete/tea-tsv.json'; */
$file_path = '../data/complete/grin_cucumis.json';

$file_data = file_get_contents($file_path);
/* var_dump($file_data); */

$json = json_decode($file_data);

$objects = $json->foods;

$count = 0;
$insert = array();
foreach ($objects as $obj_load) {
  $obj_load->category_array = explode(",", $obj_load->category);

  foreach($obj_load->category_array as $i) {
    $i = trim($i);
  }
  $collection->update(array('nid' => $obj_load->nid), array('$set' => $obj_load), true);

  $count++;
}

// find everything in the collection
/* $cursor = $collection->find(array('name' => "Dill"))->limit(10); */
/* $cursor = $collection->findOne(array('nid' => '739')); */
// $cursor = $collection->find()->limit(300);

// Print data
/*
header('Access-Control-Allow-Origin: *.foodcards.org | *.chachaville.com');
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT"); 
header("Last-Modified: " . gmdate( "D, d M Y H:i:s" ) . "GMT"); 
header("Cache-Control: no-cache, must-revalidate"); 
header("Pragma: no-cache");
header("Content-type: application/json");
$json = '{"foods": [' ;

$i = 0;

// iterate through the results

foreach ($cursor as $obj) {
  if(!empty($obj['name'])) {
    if($i > 0) {
     $json .= ',';
    }

    $json .= json_encode($obj);
  
    $i++;
  }
}

$json .= ']}';

echo $json;
*/
echo "Loaded " . $count . " Foods";
?>