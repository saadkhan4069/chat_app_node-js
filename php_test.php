<?php

$hostname = '143.198.122.68:3306';
$username = 'kukgaahqnz';
$database = 'kukgaahqnz';
$password = 'rVh524GMHM';

try {
    $pdo = new PDO("mysql:host=143.198.122.68:3306;dbname=$database", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo 'Connected successfully!';



$sql = 'SELECT * FROM t_users';

$statement = $pdo->query($sql);

// get all publishers
$publishers = $statement->fetchAll(PDO::FETCH_ASSOC);

if ($publishers) {
  // show the publishers
  foreach ($publishers as $publisher) {
    echo $publisher['first_name'] . '<br>';
  }
}


}
catch(PDOException $e) {
    die('Error ' . $e->getMessage());
}

?>