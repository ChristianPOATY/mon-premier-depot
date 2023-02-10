<?php
header('Content-type: text/event-stream');
// Encodage d’un tableau PHP en JSON
$data = json_encode(
	array( 
		'time'=>time(),
		'aleatoire'=>rand()
	)
);
echo 'data: '.$data.PHP_EOL;
?>