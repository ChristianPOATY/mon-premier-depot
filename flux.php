<?php
header('Content-type: text/event-stream');
// Démarrage du tampon de sortie
ob_start();
// Date limite d’exécution (maintenant+5 secondes)
$dt_limit = time()+5;
// Tant que le moment présent est inférieur à la date limite...
while(time()<$dt_limit) {
// Sortie des données dans le tampon
// ...avec double saut de ligne
echo 'data: '.time().PHP_EOL.PHP_EOL;
// Vidage du tampon
ob_flush();
flush();
// Roupillon d’une seconde
sleep(1);
}
// Fin du tampon
ob_end_flush();
header('Content-type: text/event-stream');
echo 'id: '.time().PHP_EOL;
echo 'data: Il est '.date("H").' h '.date("i").' et '.date("s").' s';
// Si l’identifiant précédent a été transmis, il est affiché
if(isset($_SERVER['HTTP_LAST_EVENT_ID'])) {
echo ' ... et j\'ai recu Last-Event-ID :';
echo $_SERVER['HTTP_LAST_EVENT_ID'];
}
echo PHP_EOL;
// Démarrage de la session
session_start();
header('Content-type: text/event-stream');
// Initialisation
if(!isset($_SESSION['sse_id'])) $_SESSION['sse_id'] = 0;
echo 'id: '.$_SESSION['sse_id'].PHP_EOL;
echo 'data: Il est '.date("H").' h '.date("i").' et '.date("s").' s';
// Si l’identifiant précédent a été transmis
if(isset($_SERVER['HTTP_LAST_EVENT_ID'])) {
echo ' ... et j\'ai recu Last-Event-ID :';
echo $_SERVER['HTTP_LAST_EVENT_ID'];
// Si l’identifiant précédent est égal au compteur courant-1
if($_SERVER['HTTP_LAST_EVENT_ID']==($_SESSION['sse_id']-1)) {
echo ' ... tout va bien.';
} else {
echo ' ... un message s\'est perdu !';
}
}
echo PHP_EOL;
// Incrémentation du compteur
$_SESSION['sse_id']++;
header('Content-type: text/event-stream');
// Tirage au sort, 1, 2 ou 3 ?
$r = rand(1,3);
// Événement de type heure
if($r==1) {
echo 'event: heure'.PHP_EOL;
echo 'data: Il est '.date("H").' h '.date("i").' et '.date("s").'s'.PHP_EOL;
}
// Événement de type bonjour
if($r==2) {
echo 'event: bonjour'.PHP_EOL;
echo 'data: Bonjour !'.PHP_EOL;
}
// Événement standard
if($r==3) {
echo 'data: Juste un message.'.PHP_EOL;
}
header('Content-type: text/event-stream');
echo 'id: '.time().PHP_EOL;
echo 'data: Il est '.date("H").' h '.date("i").' et '.date("s").'s'.PHP_EOL;
// Délai de reconnexion en ms
$retry = rand(1000,1500);
echo 'retry: '.$retry.PHP_EOL;
?>