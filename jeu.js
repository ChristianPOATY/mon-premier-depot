jQuery(document).ready(function(){
// Du code en jQuery va pouvoir être tapé ici !
var $playground = $('#playground'), // on entre l'objet jQuery dans une variable pour éviter de l'appeler plusieurs fois
h = 300,
w = 800; // on définit les dimensions du playground
$playground.playground({
height : h,
width : w // puis on passe ces variables en paramètre
});
$.playground() // on accède au playground
.addGroup('background', { height : h, width : w }); // puis on ajoute le groupe "background"
.end() // on revient à l'objet playground
.addGroup('player', { height : h, width : w }); // ajout du groupe "player"
// première instance
var image1 = new $.gameQuery.Animation({
imageURL : "background1.png"
});
// seconde instance
var image2 = new $.gameQuery.Animation({
imageURL : "background2.png"
});
// troisième instance
var image3 = new $.gameQuery.Animation({
imageURL : "background3.png"
});
$('#background') // on accède à notre groupe
.addSprite('image1', { // on ajoute un sprite
animation : image1, // premier objet instancié
height : h,
width : w,
// nous créons ici un arrière-plan, les dimensions sont donc
égales à celles du playground
})
.addSprite('image2', { // on répète l'opération
animation : image2,
height : h,
width : w
})
.addSprite('image3', { // on répète l'opération
animation : image3,
height : h,
width : w
});
$.playground()
.registerCallback(function(){
var left = parseInt( $("#image1").css("left") ) - 1; // l'image de fond se déplace lentement, on la déplace donc de 1 pixel à chaque intervalle
if(left < 0 - w) left = w;
$("#image1").css("left", left);
left = parseInt( $("#image2").css("left") ) - 3; // l'image du milieu se déplace plus rapidement, on la déplace de 3 pixels à chaque intervalle
if(left < 0 - w) left = w;
$("#image2").css("left", left);
left = parseInt( $("#image3").css("left") ) - 5; // l'image de devant se déplace rapidement, on la déplace de 5 pixels à chaque intervalle
if(left < 0 - w) left = w;
$("#image3").css("left", left);
}, 30); // enfin, on définit l'intervalle de temps à 30ms
$.playground().startGame(); // on lance le jeu !
var course = new $.gameQuery.Animation({
imageURL : 'course.png'
});
var repos = new $.gameQuery.Animation({
imageURL : 'repos.png',
numberOfFrame : 4, // nous avons ici 4 frames
delta : 40, // on définit la largeur d'une frame à 40px
rate : 100, // 100ms séparent chaque frame
type : $.gameQuery.ANIMATION_HORIZONTAL // on passe une constante en valeur ; si l'image était verticale, on aurait donné $.gameQuery.ANIMATION_VERTICAL
});
// ...
// nous venons d'instancier une nouvelle animation
$.playground()
.addSprite('repos', {
animation : repos, // on lance l'animation
width : 40,
height : 50 // on définit les dimensions de notre personnage
});
$.playground().startGame();
var Objet = new Classe(); // création d'un nouvel objet
var Objet2 = new Classe(argument); // création d'un nouvel objet avec spécification d'un argument
function Classe(argument){ // nouvelle classe
this.nom = argument; // nouvelle propriété
this.afficher = function(prenom){ // nouvelle méthode
alert(prenom);
};
}
function Classe(x){
this.x = x;
} 
Classe.prototype = new Mere(); // héritage de la classe Mere()
function Joueur(){
this.sauter = function(){
};
this.courir = function(){
};
} 
function Premier(){
this.cracherFeu = function(){
};
}
Premier.prototype = new Joueur();
function Second(){
this.voler = function(){
};
}
Second.prototype = new Joueur();
function Troisieme(){
this.proteger = function(){
};
}
Troisieme.prototype = new Joueur();
$(document).keydown(function(e){ // on écoute le clavier de l'utilisateur
switch(e.keyCode){
case 68: // touche D
// on se déplace à droite
break;
case 81: // touche Q
// on se déplace à gauche
break;
case 32: // touche ESPACE
// on saute
break;
}
});
var liste = $('#personnage').collision('#ennemi'); // on cherche le nombre de collision qu'il y a eu entre personnage et ennemi
if(liste.length > 0){ // si la liste est supérieure à 0
alert('Il y a eu collision !'); // alors il y a eu collision
}
});