<?php
	if(isset($_FILES) && is_array($_FILES)) {
	// Nombre de fichiers envoyés
	$nb = count($_FILES['mesfichiers']['name']);
	// Chemin destination (répertoire courant + /upload/)
	$dir = realpath('.').'/upload/';
	if($nb>0) {
	for($i=0;$i<$nb;$i++) {
	echo '<p>Fichier : '.$_FILES['mesfichiers']['name'][$i];
	echo '<br>Taille : '.$_FILES['mesfichiers']['size'][$i];
	echo '<br>Type : '.$_FILES['mesfichiers']['type'][$i];
	// Copie depuis le répertoire temporaire
	$copie = move_uploaded_file($_FILES['mesfichiers']['tmp_name'][$i], $uploaddir.$_FILES['mesfichiers']['name'][$i]);
	if($copie) echo '<br><b>Fichier copié</b></p>'; else echo '<br><b>Erreur de copie</b></p>';
	}
	} else {
	echo 'Aucun fichier envoyé';
	}
	}
?>