<?php

$hostname = getenv('MYSQL_HOST') ?: 'localhost';
$port = getenv('MYSQL_PORT') ?: '3306';
$username = getenv('MYSQL_USER') ?: '';
$database = getenv('MYSQL_DATABASE') ?: '';
$password = getenv('MYSQL_PASSWORD') ?: '';

try {
    $pdo = new PDO("mysql:host=$hostname:$port;dbname=$database", $username, $password);
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