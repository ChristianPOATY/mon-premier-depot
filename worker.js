// On débute à partir de 1
var n = 1;
// Boucle de calcul incrémental
recherche: while(true) {
n += 1;
for (var i = 2; i <= Math.sqrt(n); i += 1)
// Si le nombre n’est pas premier, on continue la recherche
if (n % i == 0) continue recherche;
// Sinon, un nombre premier est trouvé
// et se voit communiqué à la page
postMessage(n);
}
// Réception d’un message en provenance du Worker
travailleur.onmessage = function(event) {
document.getElementById('resultat').innerHTML = event.data;
};
// Émission d’un message à destination du Worker
travailleur.postMessage('Hello!');
// Cette variable définit l’état du travailleur
var en_calcul = false;
// Gestionnaire d’événement pour la réception
onmessage = function(event) {
if(en_calcul == false && event.data=="go") {
en_calcul = true;
calcul();
} else if(en_calcul==true && event.data=="pause") {
en_calcul = false;
} else if(en_calcul==true && event.data=="stop") {
en_calcul = false;
close();
}
};
// Nombre
var n = 1;
// Fonction de calcul
function calcul() {
recherche: while(en_calcul) {
n += 1;
for (var i = 2; i <= Math.sqrt(n); i += 1)
if (n % i == 0) continue recherche;
// Envoi du résultat
postMessage(n);
}
}
travailleur.onerror = function(event) {
alert("Erreur ligne : "+event.lineno+"\nFichier :"+event.filename+"\nMessage : "+event.message);
};
// Déclaration de la fonction
function receptionMessage(mon_message) {
// Traitement du message...
}
// Ajout d’un écouteur sur l’événement message
addEventListener('message', receptionMessage, false);
// Un fichier
importScripts("script.js", "connecter.js", "jeu.js");
// Création d’un objet Blob
var blob = new BlobBuilder();
// Ajout de la chaîne contenant le code
blob.append("onmessage = function(event) { postMessage('Echo !'); }");
// Génération d’une URL faisant référence au Blob
var urlBlob = window.createObjectURL(blob.getBlob());
// Création du Worker
var wkBlob = new Worker(urlBlob);
wkBlob.onmessage = function(event) {
// Réception d’un message
};