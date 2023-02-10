<?php
// on se connecte à notre base de données
try
{
$bdd = new PDO('mysql:host=localhost;dbname=tchat', 'root', '');
}
catch (Exception $e)
{
die('Erreur : ' . $e->getMessage());
} 
if(isset($_POST['submit'])){ // si on a envoyé des données avec le formulaire
if(!empty($_POST['pseudo']) AND !empty($_POST['message'])){ // si les variables ne sont pas vides
$pseudo = mysql_real_escape_string($_POST['pseudo']);
$message = mysql_real_escape_string($_POST['message']); // on sécurise nos données
// puis on entre les données en base de données :
$req = $bdd->prepare('INSERT INTO minichat (pseudo, message) VALUES(?, ?)');
$req->execute(array($_POST['pseudo'], $_POST['message']));
// Redirection du visiteur vers la page du minichat
header('Location: accueil.html');
}
else{
echo "Vous avez oublié de remplir un des champs !";
}
	} 
?>