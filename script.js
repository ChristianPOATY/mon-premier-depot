var vid = document.getElementById("video");
vid.onended = function() {
alert('Fin de la lecture.');
};
vid.onpause = function() {
alert('Pause...');
};
vid.onplay = function() {
alert('Lecture !');
};
vid.addEventListener("play", function() {
alert("C’est parti !");
},true);
vid.addEventListener("ended", function() {
alert("C'est déjà la fin...");
},true);
vid.addEventListener("pause", function() {
alert("En pause.");
},true);
document.getElementById("video").onerror = function(event) {
switch(event.target.error.code) {
case event.target.error.MEDIA_ERR_ABORTED:
alert('La lecture du média a été annulée.');
break;
case event.target.error.MEDIA_ERR_NETWORK:
alert('Une erreur ou une indisponibilité réseau n\'a pas permis le
bon déroulement du téléchargement.');
break;
case event.target.error.MEDIA_ERR_DECODE:
alert('La lecture a été annulée suite à une erreur de corruption
du fichier, ou parce que le média utilise des fonctionnalités que ce
navigateur ne peut supporter.');
break;
case event.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
alert('Le fichier ne peut être chargé, soit parce que le serveur
distant ou le réseau sont indisponibles, soit parce que le format n\'est
pas supporté.');
break;
default:
alert('Erreur inconnue.');
break;
}
};
// Cette fonction supprime tous les nodes <source>
// et le parent <video> lui-même pour ne conserver
// que le contenu alternatif
function fallback(element_video) {
video = document.getElementById(element_video);
while(video.firstChild) {
if(video.firstChild instanceof HTMLSourceElement) {
video.removeChild(video.firstChild);
} else {
video.parentNode.insertBefore(video.firstChild, video);
}
}
video.parentNode.removeChild(video);
}
var elvideo = document.createElement('video');
if(!!elvideo.canPlayType) {
// alert('HTML5 Video semble accepté');
if(!elvideo.canPlayType('video/mp4')) {
// alert('Pas de support natif video/mp4 : repli Flash');
fallback('video');
}
} else {
fallback('video');
}

var audio = document.getElementById("audio");
audio.removeAttribute("controls"); 
audio.style.display='none'; // Pour Chrome
var player = document.getElementById("player");
player.style.display='block';
var info = player.getElementsByClassName("info")[0];
var track = player.getElementsByClassName("track")[0];
var seeker = track.childNodes[0];
player.getElementsByClassName("play")[0].onclick = function() {
audio.play();
};
player.getElementsByClassName("pause")[0].onclick = function() {
audio.pause();
};
player.getElementsByClassName("audible")[0].onclick = function() {
audio.volume = 0;
this.style.display='none';
player.getElementsByClassName("muted")[0].style.display='block';
};
player.getElementsByClassName("muted")[0].onclick = function() {
audio.volume = 1;
this.style.display='none';
player.getElementsByClassName("audible")[0].style.display='block';
};
audio.addEventListener('timeupdate', function(){
var total = audio.duration;
var position = audio.currentTime;
var progression = (position/total)*100;
var min = parseInt(position/60);
var sec = parseInt(position-(min*60));
seeker.style.width=parseFloat(progression)+'%';
if(sec<10) sec = '0'+sec;
info.innerHTML = min+':'+sec;
}, false);
audio.addEventListener('ended', function() {
info.innerHTML = '0:00';
seeker.style.width=0;
}, false);
track.addEventListener('click',function(event) {
var pos = event.offsetX/event.target.clientWidth;
audio.currentTime = pos*100/audio.duration;
});
var audio = new Audio("fichier.mp3");
audio.play();

// Fonction de callback en cas de succès
function succesGeo(position) {
var infopos = "Position déterminée : <br>";
infopos += "Latitude : "+position.coords.latitude +"<br>";
infopos += "Longitude: "+position.coords.longitude+"<br>";
infopos += "Altitude : "+position.coords.altitude +"<br>";
document.getElementById("maposition").innerHTML = infopos;
// On instancie un nouvel objet LatLng pour Google Maps
var latlng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
// Ainsi que des options pour la carte, centrée sur latlng
var optionsGmaps = {
mapTypeControl: false,
center: latlng,
navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
mapTypeId: google.maps.MapTypeId.ROADMAP,
zoom: 15
};
// Initialisation de la carte avec les options
var map = new google.maps.Map(document.getElementById("map"), optionsGmaps);
// Ajout d’un marqueur à la position trouvée
var marker = new google.maps.Marker({
position: latlng,
map: map,
title:"Vous êtes ici"
});
}
function suiviGeo(position) {
var suivpo = "Suivi de position déterminée : <br>";
infopos += "Latitude : "+position.coords.latitude +"<br>";
infopos += "Longitude: "+position.coords.longitude+"<br>";
infopos += "Altitude : "+position.coords.altitude +"<br>";
document.getElementById("maposition").innerHTML = suivpo;
}
// Fonction de callback en cas d’erreur
function erreurGeo(error) {
var info = "Erreur lors de la géolocalisation : ";
info += error.message;
switch(error.code) {
case error.TIMEOUT: info += "Timeout !";
break;
case error.PERMISSION_DENIED: info += "Vous n’avez pas donné la permission";
break;
case error.POSITION_UNAVAILABLE: info += "La position n’a pu être déterminée";
break;
case error.UNKNOWN_ERROR: info += "Erreur inconnue";
break;
}
document.getElementById("maposition").innerHTML = info;
}
// Initialisation du framework et géolocalisation
if(geo_position_js.init()){
document.getElementById("maposition").innerHTML = "En cours...";
geo_position_js.getCurrentPosition(succesGeo,erreurGeo);
} else {
alert("Ce navigateur ne supporte pas la géolocalisation");
}
var suivpo = geo_suivi_js.watchPosition(suiviGeo,erreurGeo);
// Pour annuler la surveillance continue
function annuler() {
geo_suivi_js.clearWatch(suivpo);
}
	
		var finput = document.getElementById('mesfichiers');
		if (finput.addEventListener){
		finput.addEventListener('change', analyseFichiers, false);
		} else if (finput.attachEvent) {
		finput.attachEvent('onchange', analyseFichiers);
		}
		function analyseFichiers(fichiers) {
		if(fichiers) {
		var infos = document.getElementById('infos');
		var nombreFichiers = fichiers.length;
		var tailleTotale = 0;
		infos.innerHTML = "<p>Il y a <b>"+nombreFichiers+"</b> fichiers</p>";
		infos.innerHTML += "<ul>";
		for(i=0;i<nombreFichiers;i++){
		infos.innerHTML += "<li>"+fichiers[i].name+" ("+fichiers[i].type+")</li>";
		tailleTotale += fichiers[i].size;
		}
		infos.innerHTML += "</ul>";
		infos.innerHTML += "<p>Total : <b>"+Math.round(tailleTotale/1024)+"</b> Kio </p>";
		}
		if(fichiers) {
		for(i=0;i<fichiers.length;i++){
		// Si le fichier est de type image
		// ... et que FileReader est disponible 
		if(fichiers[i].type.match('image.*') && (typeof window.FileReader !=='undefined')) {
		// Nouvelle instance de FileReader
		reader = new FileReader();
		// Gestion de l'événement load
		reader.onload = function (event) {
		// Création de l'image
		var img = document.createElement('img');
		img.src = event.target.result;
		// Insertion aléatoire dans canvas
		var x = Math.random()*(canvas.width-img.width);
		var y = Math.random()*(canvas.height-img.height);
		ctx.drawImage(img,x,y)
		// Ajout en tant qu'image
		var img = document.createElement('img');
		img.src = event.target.result;
		// Ajout dans le DOM
		document.body.parentNode.insertBefore(img,document.body.nextSibling);
		// Modification du style à la volée
		img.style.top = Math.round(Math.random()*window.innerHeight/2)+"px";
		img.style.left = Math.round(Math.random()*window.innerWidth/2)+"px";
		// Rotation aléatoire
		var rotation = Math.round(Math.random()*40-20);
		img.style.webkitTransform = "rotate("+rotation+"deg)";
		img.style.OTransform = "rotate("+rotation+"deg)";
		img.style.msTransform = "rotate("+rotation+"deg)";
		img.style.MozTransform = "rotate("+rotation+"deg)";
		img.style.transform = "rotate("+rotation+"deg)";
		};
		// Lancement de FileReader pour le fichier
		reader.readAsDataURL(fichiers[i]);
		}
		}
		}
		if(fichiers) {
		for(i=0;i<fichiers.length;i++){
		// Si le fichier est de type texte
		// ... et que FileReader est disponible 
		if(fichiers[i].type.match('texte.*') && (typeof window.FileReader !=='undefined')) {
		// Nouvelle instance de FileReader
		reader = new FileReader();
		// Gestion de l'événement load
		reader.onload = function (event) {
		// Création de texte
		var text = document.createElement('text');
		text.src = event.target.result;
		// Insertion aléatoire dans canvas
		var x = Math.random()*(canvas.width-text.width);
		var y = Math.random()*(canvas.height-text.height);
		ctx.drawImage(text,x,y)
		// Ajout en tant qu'image
		var text = document.createElement('text');
		text.src = event.target.result;
		// Ajout dans le DOM
		document.body.parentNode.insertBefore(text,document.body.nextSibling);
		// Modification du style à la volée
		text.style.top = Math.round(Math.random()*window.innerHeight/2)+"px";
		text.style.left = Math.round(Math.random()*window.innerWidth/2)+"px";
		// Rotation aléatoire
		var rotation = Math.round(Math.random()*40-20);
		text.style.webkitTransform = "rotate("+rotation+"deg)";
		text.style.OTransform = "rotate("+rotation+"deg)";
		text.style.msTransform = "rotate("+rotation+"deg)";
		text.style.MozTransform = "rotate("+rotation+"deg)";
		text.style.transform = "rotate("+rotation+"deg)";
		};
		// Lancement de FileReader pour le fichier
		reader.readAsDataURL(fichiers[i]);
		}
		}
		}
		var canvas = document.getElementById('dessin');
		var ctx = canvas.getContext('2d');
		function analyseFichiers(fichiers) {
		if(fichiers) {
		for(i=0;i<fichiers.length;i++){
		if(fichiers[i].type.match('image.*') && (typeof window.FileReader !== 'undefined')) {
		reader = new FileReader();
		reader.onload = function (event) {
		// Création de l'image
		var img = document.createElement('img');
		img.src = event.target.result;
		// Insertion aléatoire dans canvas
		var x = Math.random()*(canvas.width-img.width);
		var y = Math.random()*(canvas.height-img.height);
		ctx.drawImage(img,x,y);
		};
		reader.readAsDataURL(fichiers[i]);
		}
		}
		}
		}
		var img = document.createElement('img');
		// Version universelle
		if(window.URL && typeof window.URL.createObjectURL!=='undefined') {
		img.src = window.URL.createObjectURL(fichiers[i]);
		// Version webkit
		} else if(window.webkitURL && typeof
		window.webkitURL.createObjectURL!=='undefined') {
		img.src = window.webkitURL.createObjectURL(fichiers[i]);
		}
		var reader = new FileReader();
		reader.onload = function(e) {
		event.target.result; // données texte
		}
		var formulaire = document.getElementById('formulaire');
		var progression = document.getElementById('avancement');
		var infos = document.getElementById('infos');
		formulaire.onsubmit = function(event) {
		// Désactivation du comportement par défaut du formulaire 
		event.preventDefault();
		// Disponibilité de FormData ? 
		if(window.FormData) {
		var fd = new FormData();
		} else {
		alert("FormData non supporté");
		return;
		}
		// Initialisation Ajax 
		var xhr = new XMLHttpRequest();
		// Paramètres globaux de la requête 
		// formulaire.getAttribute("action") = "envoi_fichier.php"
		xhr.open("POST", formulaire.getAttribute("action"), true);
		// Au changement de statut 
		xhr.onreadystatechange = function(event) {
		if(this.readyState === 4) {
		// Affichage du retour texte de la requête
		infos.innerHTML += event.target.responseText;
		}
		};
		// Durant la progression... 
		xhr.onprogress = function(event) {
		if(event.lengthComputable) {
		var pourcentage = Math.round(event.loaded*100/event.total);
		// infos.innerHTML += pourcentage.toString()+'%<br>';
		progression.setAttribute("aria-valuenow",pourcentage);
		progression.value = pourcentage;
		}
		};
		// A la fin du chargement 
		xhr.onload = function(event) {
		infos.innerHTML += '<p style="color:green">Chargement terminé<p>';
		};
		// En cas d'erreur 
		xhr.onerror = function(event) {
		infos.innerHTML += '<p style="color:red">Erreur<p>';
		};
		// En cas d'annulation 
		xhr.onabort = function(event) {
		infos.innerHTML += '<p style="color:orange">Annulation<p>';
		};
		// Liste des fichiers à envoyer
		var inputfichiers = document.getElementById('mesfichiers');
		var fichiers = inputfichiers.files;
		// Pour chaque fichier
		for(i=0;i<fichiers.length;i++) {
		infos.innerHTML += "Envoi de "+fichiers[i].name+"...<br>";
		// Ajout à FormData
		// inputfichiers.name = "mesfichiers[]"
		fd.append(inputfichiers.name,fichiers[i]);
		}
		// Envoi des données 
		xhr.send(fd);
		};
		
			// Identifiant de l’élément de réception
			var dropzone = document.getElementById('drop');
			// Fonction entrée survol de la cible
			function entree(event) {
			event.target.className = 'deposezmoi';
			event.preventDefault();
			}
			// Fonction sortie survol de la cible
			function sortie(event) {
			event.target.className = '';
			}
			// Fonction d’annulation du comportement par défaut
			function survol(event) {
			event.dataTransfer.dropEffect="copy";
			event.preventDefault();
			return false;
			}
			// Redéfinition des événements
			if(window.addEventListener) {
			dropzone.addEventListener('dragover',survol);
			dropzone.addEventListener('dragenter',entree);
			dropzone.addEventListener('dragleave',sortie);
			} else {
			dropzone.attachEvent('dragover',survol);
			dropzone.attachEvent('dragenter',entree);
			dropzone.attachEvent('dragleave',sortie);
			}
			// Traitement du déplacement
			function deplace(event) {
			event.dataTransfer.effectAllowed="all";
			var attribut_src = event.target.getAttribute("src");
			if(attribut_src!=null) {
			event.dataTransfer.setData("text/html",'<img src="'+attribut_src+'">');
			} else {
			event.dataTransfer.setData("text/plain",event.target.innerText||event.target.textContent);
			}
			}
			// Traitement du dépôt
			function depot(event) {
			event.preventDefault();
			if(event.dataTransfer) {
			var html = event.dataTransfer.getData("text/html");
			var texte = event.dataTransfer.getData("text/plain");
			if(html) event.target.innerHTML += html+" ";
			else event.target.innerHTML += texte+" ";
			event.target.className = '';
			}
			}
			// Suppression de l'élément ayant suscité l'événement
			function supprime(event) {
			event.target.parentNode.removeChild(event.target);
			}
			// Identifiant de l’élément de réception
			var dropzone = document.getElementById('drop');
			// Fonction entrée survol de la cible
			function entree(event) {
			event.target.className = 'deposezmoi';
			event.preventDefault();
			}
			// Fonction sortie survol de la cible
			function sortie(event) {
			event.target.className = '';
			}
			// Fonction d’annulation du comportement par défaut
			function survol(event) {
			event.dataTransfer.dropEffect="copy";
			event.preventDefault();
			return false;
			}
			// Redéfinition des événements
			if(window.addEventListener) {
			dropzone.addEventListener('dragover',survol);
			dropzone.addEventListener('dragenter',entree);
			dropzone.addEventListener('dragleave',sortie);
			} else {
			dropzone.attachEvent('dragover',survol);
			dropzone.attachEvent('dragenter',entree);
			dropzone.attachEvent('dragleave',sortie);
			}
			// Traitement du dépôt 
			function depot(e) {
			e.preventDefault();
			var fichiers = e.dataTransfer.files;
			// Boucle sur la liste des fichiers dropés
			for(var i=0; i<fichiers.length; i+=1) {
			// Mémorisation dans une variable en short
			var f = fichiers[i];
			// Affichage des informations
			e.target.innerHTML += "<p>Nom : "+f.name+"<br>";
			e.target.innerHTML += "Taille : "+f.size+" octets<br>";
			e.target.innerHTML += "Type : "+f.type+"</p>";
			// Si le type correspond à une image
			if(f.type.match('image.*')) {
			if (typeof window.FileReader !== 'undefined') {
			// Instanciation de FileReader
			reader = new FileReader();
			// Définition de l'événement load de FileReader
			reader.onload = function(event) {
			// Ajout en tant que background
			dropzone.style.background = 'url('+event.target.result+') no-repeat center';
			// Ajout en tant qu'image
			var img = document.createElement('img');
			img.src = event.target.result;
			// Ajout dans le DOM
			dropzone.parentNode.insertBefore(img,dropzone.nextSibling);
			};
			// Lancement de FileReader pour le fichier
			reader.readAsDataURL(f);
			} else alert("FileReader non supporté");
			}
			return false;
			}
			}
			// Ensemble de fichiers ciblés d’après la classe
			var fichiers = document.getElementsByClassName("dragout");
			// Boucle sur les fichiers trouvés
			for(i = 0; i<fichiers.length; i++) {
			// Pour chacun un gestionnaire d’événement dragstart 
			fichiers[i].addEventListener("dragstart",function(event) {
			// Les données sont stockées dans un attribut
			// data-downloadurl, accessible par deux méthodes
			if(event.target.dataset && event.target.dataset.downloadurl) {
			// Si la propriété dataset existe
			var data = event.target.dataset.downloadurl;
			} else {
			// Sinon par getAttribute
			var data = event.target.getAttribute("data-downloadurl");
			}
			// setData sur l’interface dataTransfer de l’événement
			event.dataTransfer.setData("DownloadURL",data);
			},false);
			}
			
				// Création d’un nouvel objet Server-Sent Event
				var sse = new EventSource("flux.php");
				var date = document.getElementById("infos");
				var maintenant = document.getElementById("maintenant");
				// Événement de réception d’un message
				sse.onmessage = function(event) {
				// Nouvel objet Date
				var dt = new Date();
				// Affectation du timestamp reçu
				dt.setTime(parseInt(event.data)*1000);
				// Insertion dans le document
				maintenant.innerHTML = dt.toString();
				// Ajout des données brutes dans la zone d’information
				infos.innerHTML += "<p class=\"message\">"+event.data+"</p>";
				};
				// Événement d’erreur (ou de fermeture de connexion)
				sse.onerror = function(event) {
				infos.innerHTML += "<p class=\"erreur\">Fin de connexion à"+e.srcElement.URL+"</p>";
				};
				// Événement d’ouverture de connexion
				sse.onopen = function(event) {
				infos.innerHTML += "<p class=\"ok\">Connexion ouverte</p>";
				};
				var sse = new EventSource("flux.php");
				var infos = document.getElementById("infos");
				sse.addEventListener("heure",function(event) {
				infos.innerHTML += "<p class=\"message heure\">"+event.data+"</p>";
				});
				sse.addEventListener("bonjour",function(event) {
				infos.innerHTML += "<p class=\"message\">"+event .data+"</p>";
				});
				var sse = new EventSource("data-json.php");
				var infos = document.getElementById("infos");
				sse.onmessage = function(event) {
				var donnees = JSON.parse(event.data);
				infos.innerHTML += "<p class=\"message\">";
				infos.innerHTML += "Timestamp : "+donnees.time+"<br>";
				infos.innerHTML += "Nombre aléatoire : "+donnees.aleatoire;
				infos.innerHTML += "</p>";
				};
				if (!!window.EventSource) {
				var source = new EventSource('event-source.php');
				} else {
				// Utiliser une alternative (en Ajax par exemple)
				}
				
					// Mémorisation de la fenêtre destination dans une variable
					var destination = document.getElementById('iframe').contentWindow;
					// Redéfinition de la validation du formulaire
					document.getElementById('envoi').onsubmit = function(event) {
					// Mémorisation du texte dans une variable
					var texte = document.getElementById('message').value;
					// Envoi de la variable à la fenêtre destination
					destination.postMessage(texte,"/");
					event.preventDefault();
					};
					// Gestionnaire d'événement 'message'
					if (typeof window.addEventListener != 'undefined') {
					window.addEventListener('message', reception, false);
					} else if (typeof window.attachEvent != 'undefined') {
					window.attachEvent('onmessage', reception);
					}
					// Traitement de l'événement
					function reception(event) {
					// Vérification de l'origine
					if(event.origin!=='/') {
					alert("Mauvaise origine");
					} else {
					// Prise en compte du message
					var li = document.createElement('li');
					li.innerHTML = event.origin +' a dit : '+event.data;
					document.getElementById('messages').appendChild(li);
					}
					}
					var destination = document.getElementById('iframe').contentWindow;
					document.getElementById('envoi').onsubmit = function(event) {
					var texte = document.getElementById('message').value;
					// Création d’un objet composé de deux propriétés
					var objet = {messagetxt:texte,date:new Date()};
					// Conversion de l’objet en chaîne texte au format JSON
					var jsondata = JSON.stringify(objet);
					// Envoi de la chaîne texte
					destination.postMessage(jsondata,"/");
					event.preventDefault();
					};
					if (typeof window.addEventListener != 'undefined') {
					window.addEventListener('message', reception, false);
					} else if (typeof window.attachEvent != 'undefined') {
					window.attachEvent('onmessage', reception);
					}
					// Traitement de l'événement
					function reception(event) {
					// Vérification de l'origine
					if(event.origin!=='/') {
					alert("Mauvaise origine");
					} else {
					// Création d’un objet à partir de la chaîne JSON
					var obj = JSON.parse(event.data);
					var li = document.createElement('li');
					// Création d’une ligne à partir des propriétés de l’objet
					li.textContent = obj.date+' : '+obj.messagetxt;
					document.getElementById('messages').appendChild(li);
					}
					}
					var destination = document.getElementById('iframe').contentWindow;
					document.getElementById('envoi').onsubmit = function(event) {
					var texte = document.getElementById('message').value;
					destination.postMessage(texte,"/");
					document.getElementById('retour').textContent = '';
					event.preventDefault();
					};
					// Réception des messages en retour
					if (typeof window.addEventListener != 'undefined') {
					window.addEventListener('message', reception, false);
					} else if (typeof window.attachEvent != 'undefined') {
					window.attachEvent('onmessage', reception);
					}
					// Traitement des messages en retour
					function reception(event) {
					if(event.origin!=='/') {
					alert("Mauvaise origine");
					} else {
					if(event.data=='OK') {
					document.getElementById('retour').textContent = 'Message reçu';
					} else {
					document.getElementById('retour').textContent = 'Erreur';
					}
					}
					}
					if (typeof window.addEventListener != 'undefined') {
					window.addEventListener('message', reception, false);
					} else if (typeof window.attachEvent != 'undefined') {
					window.attachEvent('onmessage', reception);
					}
					function reception(event) {
					if(event.origin!=='/') {
					alert("Mauvaise origine");
					} else {
					var li = document.createElement('li');
					li.textContent = event.origin+' : '+event.data;
					document.getElementById('messages').appendChild(li);
					// Réponse à l'appelant
					event.source.postMessage('OK',e.origin);
					}
					}
					
						var ws = null;
						// Création d’un nouveau socket 
						// (pour Mozilla avec version préfixée)
						if('MozWebSocket' in window) {
						ws = new MozWebSocket("ws://www.mondomaine.com:1337/web-sockets/phpwebsocket/chat.php");
						// (pour les autres implémentations sans préfixe)
						} else if('WebSocket' in window) {
						ws = new WebSocket("ws://www.mondomaine.com:1337/web-sockets/phpwebsocket/chat.php");
						}
						// Si un objet a bien été initialisé
						if(typeof ws !=='undefined') {
						// Indication de l'état
						var rs = document.getElementById('rs');
						// Lors de l'ouverture de connexion
						ws.onopen = function() {
						log("Socket ouvert");
						rs.innerHTML = this.readyState;
						};
						// Lors de la réception d'un message
						ws.onmessage = function(event) {
						// Ajout au journal du contenu du message
						log("< "+event.data);
						rs.innerHTML = this.readyState;
						};
						// Lors d'une erreur de connexion
						ws.onerror = function(event) {
						log("Erreur de connexion");
						rs.innerHTML = this.readyState;
						};
						// Lors de la fermeture de connexion
						ws.onclose = function(event) {
						if(event .wasClean) {
						log("Socket fermé proprement");
						} else {
						log("Socket fermé");
						if(event .reason) log(event.reason);
						}
						rs.innerHTML = this.readyState;
						};
						// Événement submit du formulaire
						document.getElementsByTagName('form')[0].onsubmit = function(event) {
						var texte = document.getElementById('texte');
						// Envoi de la chaîne texte
						ws.send(texte.value);
						log("> "+texte.value);
						// Mise à zéro du champ et focus
						texte.focus();
						texte.value = '';
						// Empêche de valider le formulaire
						event.preventDefault();
						};
						} else {
						alert("Ce navigateur ne supporte pas Web Sockets");
						}
						// Fonction d’ajout au journal
						function log(txt) {
						document.getElementById('log').innerHTML += txt+"\r\n";
						}
						
							if(typeof(localStorage) == "undefined") {
							alert("Ce navigateur ne supporte pas Web Storage");
							} else {
							// Valeur par défaut
							if(!localStorage.visites)
							localStorage.setItem("visites","0");
							// Variable temporaire
							var nb = "";
							// Lecture
							// parseInt() convertit le texte en nombre entier
							nb = parseInt(localStorage.getItem("visites"));
							// Incrémentation du compteur
							nb++;
							// Mémorisation
							localStorage.setItem("visites",nb);
							// Affichage
							document.getElementById("nb_visites").innerHTML = nb;
							}
							try {
							localStorage.setItem("data", "010000010110110001101100001000000111100101101111011101010111001000100000011000100110000101110011011001010010000001100001011100100110010100100000011000100110010101101100011011110110111001100111001000000111010001101111001000000111010101110011");
							} catch(exception) {
							if(exception == QUOTA_EXCEEDED_ERR) {
							alert('Limite de stockage atteinte');
							}
							}
							// Construction d’un objet (vide)
							var album = {};
							// Ajout de membres numériques
							album.duree = 208;
							album.pistes = 1;
							// Ajout de membres chaînes de texte
							album.titre = "Bible";
							album.artiste = "Jésus Christ";
							// Stockage
							localStorage.setItem("album", JSON.stringify(album));
							// Déstockage
							console.log( JSON.parse(localStorage.getItem("album")) );
							// Valeurs par défaut au chargement
							if(typeof localStorage!='undefined') {
							var prenom = localStorage.getItem('prenom');
							if(prenom) document.getElementById('prenom').value = prenom;
							}
							if(typeof sessionStorage!='undefined') {
							var etat = sessionStorage.getItem('conditions');
							if(etat=='true') document.getElementById('conditions').checked = true;
							}
							// Champ qui va être concerné
							var champ = document.getElementById("texte");
							// Si la valeur de la sauvegarde est présente au chargement
							if(sessionStorage.getItem("sauvegarde").length!=null) {
							// Alors il suffit de la restaurer
							champ.value = sessionStorage.getItem("sauvegarde");
							}
							// Toutes les deux secondes (2000 ms) 
							setInterval(function(){
							// Le champ texte est mémorisé dans le stockage de sessio
							sessionStorage.setItem("sauvegarde", champ.value);
							}, 2000);
							window.addEventListener('storage', function(event) {
							alert('La clé '+event.key+' a été modifiée de '+event.oldValue+' à '+event.newValue);
							}, false);
							
								// Gestion des événements au clic
								document.getElementById('tout').onclick = tout_db;
								document.getElementById('insere').onclick = insertion_db;
								document.getElementById('vide').onclick = vide_db;
								document.getElementById('get').onclick = get_db;
								document.getElementById('filtre1').onclick = filtre1_db;
								document.getElementById('filtre2').onclick = filtre2_db;
								// Fonction d’ajout au journal
								function log(txt) {
								document.getElementById('log').innerHTML += txt+"<br>";
								}
								// Fonction d’affichage résultat
								function affiche(ville) {
								document.getElementById('log').innerHTML += '<table><th>'+ville .desc+'</th>'+'<td>'+ville .lat+'</td>'+'<td>'+ville .lng+'</td>'+'<td>'+ville .alt+'m</td></table>';
								}
								if(!window.indexedDB && window.mozIndexedDB) {
								// Gecko
								window.indexedDB = mozIndexedDB;
								} else if(!window.indexedDB && window.webkitIndexedDB) {
								// WebKit
								window.indexedDB = webkitIndexedDB;
								window.IDBKeyRange = webkitIDBKeyRange;
								window.IDBTransaction = window.webkitIDBTransaction;
								} else if(!window.indexedDB) {
								alert("Votre navigateur ne supporte pas IndexedDB");
								}
								// Variables générales
								var db;
								var version = 1;
								if(window.indexedDB) {
								// Ouverture de la base 
								var requeteOpen = window.indexedDB.open("BaseGeo");
								// Succès de l'ouverture
								requeteOpen.onsuccess = function(event) {
								// Référence à la base
								db = event.target.result;
								log("Base '"+db.name+"' ouverte");
								log("Version : "+db.version);
								log("Catalogues : "+db.objectStoreNames.length);
								db.onerror = function(event){
								log("Erreur DB");
								// Affichage dans la console
								if(typeof console!='undefined') console.log(event);
								};
								// Si la version a changé
								if(version!= db.version) {
								// Phase de changement de version
								var requeteSetVersion = db.setVersion(version);
								requeteSetVersion.onfailure = db.onerror;
								requeteSetVersion.onsuccess = function() {
								// Effacement du catalogue s'il existe
								if(db.objectStoreNames.contains('geo'))
								try {
								db.deleteObjectStore("geo");
								} catch(exception) {
								log("Erreur lors de la réinitialisation");
								}
								// Création du catalogue
								log("Création nouveau catalogue...");
								var objStore = db.createObjectStore("geo",{keyPath:"id"},true);
								// Création d'un index
								log("Création index...");
								objStore.createIndex("alt", "alt", { unique: false });
								log("Changement de version OK");
								};
								}
								}
								}
								function insertion_db() {
								log("Insertion de 3 objets...");
								// Nouvelle transaction 
								var transaction = db.transaction(["geo"],IDBTransaction.READ_WRITE);
								transaction.oncomplete = function() {
								log("Insertion complète");
								};
								transaction.onerror = function() {
								log("Erreur lors de l'insertion");
								};
								// Récupération du catalogue d’objets
								var objStore = transaction.objectStore("geo");
								// Objets à insérer
								var ville1 = {
								id:1,
								lat:48.58177,
								lng:7.750555,
								alt:142,
								desc:"Pointe Noire"
								};
								var ville2 = {
								id:2,
								lat:48.458807,
								lng:-5.088043,
								alt:19,
								desc:"Brazzaville"
								};
								var ville3 = {
								id:3,
								lat:49.0525,
								lng:7.425833,
								alt:249,
								desc:"Dolisie"
								};
								// Affichage pour information
								affiche(ville1);
								affiche(ville2);
								affiche(ville3);
								// Ajout au catalogue
								objStore.put(ville1);
								objStore.put(ville2);
								objStore.put(ville3);
								}
								function tout_db() {
								log("Affichage du contenu du catalogue");
								// Nouvelle transaction 
								var transaction = db.transaction(["geo"]);
								// Catalogue d’objets
								var objStore = transaction.objectStore("geo");
								// Ouverture d'un curseur
								var requeteCur = objStore.openCursor();
								requeteCur.onsuccess = function(event) {
								// Curseur
								var cursor = event.target.result;
								// Si le curseur n’est pas nul
								if(cursor) {
								// Affichage du contenu
								affiche(cursor.value);
								// Continue jusqu'à l'enregistrement suivant
								cursor.continue();
								}
								};
								requeteCur.onfailure = db.onerror;
								}
								function get_db() {
								// Valeur d'après l'élément input
								var dbid = document.getElementById("dbid").value;
								if(dbid=='undefined' || dbid=='') {
								log("Veuillez indiquer un id");
								} else {
								dbid = parseInt(dbid); // Conversion en entier
								log('id='+dbid);
								// Nouvelle transaction 
								var transaction = db.transaction(["geo"]);
								// Utilisation de get() sur le catalogue
								var requete = transaction.objectStore("geo").get(dbid);
								// En cas de succès
								requete.onsuccess = function() {
								if(requete.result) affiche(requete.result);
								};
								requete.onerror = db.onerror;
								}
								}
								function filtre1_db() {
								// Valeur d'altitude d'après le formulaire
								var altitude = parseInt(document.getElementById('alt').value);
								log('alt='+altitude);
								var transaction = db.transaction(["geo"]);
								var objStore = transaction.objectStore("geo");
								// Index "alt" du catalogue d'objets 
								var indexAlt = objStore.index("alt");
								// Application à l'index
								indexAlt.get(altitude).onsuccess = function(event) {
								if(event.target.result) affiche(event.target.result);
								};
								}
								function filtre2_db() {
								// Valeur d'après le formulaire
								var altitude = parseInt(document.getElementById('minalt').value);
								// Utilisation de l'index 
								var indexAlt = db.transaction(["geo"]).objectStore("geo").index("alt");
								// Création d'un objet IDBKeyRange avec limite basse
								var limite = IDBKeyRange.lowerBound(altitude);
								// Application au curseur
								indexAlt.openCursor(limite).onsuccess = function(event) {
								var cursor = event.target.result;
								if(cursor) {
								log('alt>'+altitude);
								affiche(cursor.value);
								cursor.continue();
								}
								};
								}
								function vide_db() {
								transaction = db.transaction(["geo"],IDBTransaction.READ_WRITE);
								transaction.objectStore("geo").clear();
								}
									
									var statut = document.getElementById('statut');
									// Détection initiale 
									if(navigator.onLine) {
									// Mode connecté
									statut.innerHTML = 'connecté';
									statut.className = 'online';
									} else {
									// Mode déconnecté
									statut.innerHTML = 'déconnecté';
									statut.className = 'offline';
									}
									// Enregistrement des événements
									if(window.addEventListener) {
									// Pour les navigateurs supportant addEventListener
									window.addEventListener("online",estOnline,false);
									window.addEventListener("offline",estOffline,false);
									} else {
									// Pour les autres
									document.body.ononline = estOnline;
									document.body.onoffline = estOffline;
									}
									function estOnline() {
									// Le navigateur est connecté
									statut.innerHTML = 'passé en mode connecté';
									statut.className = 'online';
									}
									function estOffline() { 
									statut.innerHTML = 'passé en mode déconnecté';
									statut.className = 'offline';
									}
									window.applicationCache.onupdateready = function() {
									if(window.applicationCache.status==window.applicationCache.UPDATEREADY) {
									window.applicationCache.swapCache();
									if(confirm("Une nouvelle version de l\'application est disponible, voulezvous la charger ?")) {
									window.location.reload();
									}
									}
									};
									// Enregistrement des événements
									if(window.addEventListener) {
									// Pour les navigateurs supportant addEventListener
									window.addEventListener("online",estOnline,false);
									window.addEventListener("offline",estOffline,false);
									} else {
									// Pour les autres
									document.body.ononline = estOnline;
									document.body.onoffline = estOffline;
									}
									// Stockage local du texte saisi
									function memoriser() {
									var message = document.getElementById('message').value;
									localStorage.setItem("message",message);
									}
									// Le navigateur est passé en mode connecté
									function estOnline() {
									var message = localStorage.getItem("message");
									if(confirm("Vous êtes en ligne, récupérer les données ?")) {
									document.getElementById('message').value = message;
									}
									}
									// Le navigateur est déconnecté
									function estOffline() {
									alert("Vous êtes déconnecté mais je mémorise...");
									memoriser();
									}
									
										window.onload = function() {
										// Fonction gérant l'affichage et le
										// masquage des différentes vues
										function affiche(identifiant) {
										var articles = document.querySelectorAll("#contenu article");
										// Valeur par défaut si aucun identifiant
										if(identifiant==null) identifiant = "#"+articles[0].getAttribute("id");
										document.getElementById("messages").innerHTML += "On affiche <i>"+identifiant+"</i><br>";
										// Application de la vue active
										for(j=0;j<articles.length;j++) {
										if("#"+articles[j].getAttribute("id")==identifiant) {
										articles[j].style.display='block';
										} else {
										articles[j].style.display='none';
										}
										}
										// Application de la classe active au lien
										for(j=0;j<liens.length;j++) liens[j].className='';
										document.querySelector('#liens a[href="'+identifiant+'"]').className='actif';
										}
										// Détection de la présence de l'API
										if (typeof history.pushState !== "undefined") {
										var liens = document.querySelectorAll("#liens a");
										// Pour tous les liens
										for(i=0;i<liens.length;i++){
										// Création d'un gestionnaire d'événement click
										liens[i].addEventListener('click',function(event) {
										// Appel de la fonction d'affichage
										// avec pour paramètre le hash du lien
										affiche(event.target.hash);
										// Création de l'objet d'état
										var etat = {affichage:event.target.hash};
										// Insertion dans l'historique
										history.pushState(etat,event.target.text,event.target.text+".html");
										event.preventDefault();
										},false);
										}
										// Classe par défaut au chargement sur le premier lien
										liens[0].className='actif';
										// Gestionnaire d'événement popstate
										window.onpopstate = function(event) {
										document.getElementById("messages").innerHTML += "<span>Evénement popstate !</span><br><i>event.state</i> = "+event.state+"<br>";
										// Si un objet d'état est présent
										if(event.state!=null) {
										document.getElementById("messages").innerHTML +="<i>event.state.affichage</i> = "+event.state.affichage+"<br>";
										// Appel de la fonction d'affichage
										// avec pour paramètre l'identifiant mémorisé
										affiche(event.state.affichage);
										} else {
										// Appel de la fonction d'affichage sans état
										affiche(null);
										}
										}
										} else {
										alert("Ce navigateur ne supporte pas la gestion avancée de l'historique");
										}
										};
										window.onhashchange = function() {
										alert("L’ancre a été modifiée : "+location.hash);
										}
										
											if(screen.width <= 640) {
											var lien_css = document.createElement('link');
											lien_css.href = "style.css";
											lien_css.rel = "stylesheet";
											lien_css.type = "text/css";
											document.getElementsByTagName("head")[0].appendChild(lien_css);
											}