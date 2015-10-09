# youtubeApp (à changer le nom) by Bill

<h2>Concept de l'application</h2>

Tu pensais être un feignant, YoutubeApp t'aide et t'amène un cran plus loin.
Cette application permet à un utilisateur de rechercher des videos Youtube, de les lancer directement sur son ordinateur et ce à l'aide uniquement de son téléphone portable.

<h2>Installation</h2>

Mobile: Ionic view id: "d1247a23"

Desktop: 
<ul>
<li> Windows Installer: <a href="http://www.filedropper.com/windows-installer">Ici</a></li>
<li> Mac: télécharger youtubeApp_desktop directory, npm install et après en ligne de commande "electron ."</li>
</ul>

<h3>Quelles sont les fonctionnalités de l'application ?</h3>

    - chercher une video
    - lancer une video sur son ordinateur
    - stop/play/pause
    - mute/unmute
    - changer le volume

<h3>Technologies utilisées</h3>

  <h4>Côté serveur :</h4>

Serveur node.js avec Express.js/socket.io/MongoDB.
Utiliser node.js et socket.io permet une utilisation rapide/facile des websockets et donc une communication en temps réel.

  <h4>Côté Mobile</h4>

Ionic/angular/ui-router/socket.io, technologies prises en fonction de ionic lui même.

  <h4>Côté Desktop</h4>

Electron.js pour la creation de l'application. Electron permet la création d'application desktop avec du javascript/html/css.
J'ai choisi Electron plutot que nw.js car electron semble être développé bien plus activement, j'y vois donc un intéret certains pour les prochaines années.
Utilisation de Jquery pour le front-end pour un développement rapide (je risque de le changer lorsque je continuerai à développer l'application).

<h3>Difficultés Rencontrées</h3>

Le plus dur dans ce projet fut le développement triplatform (desktop, serveur, mobile) en même temps et le fait que les trois sont énormement liés avec les sockets, la recherche d'erreurs pouvait donc être fastidieuse. Le développement avec electron.js fut aussi une première, il m'a donc fallut apprendre à utiliser cette technologie.

Globalement, le projet nécéssiterais que je mette tout sur papier, réfléchisse aux solutions/besoins et décider ensuite de la direction à prendre au niveau technologie, structure et fonctionnalités futures.

J'espère avoir le temps de continuer le projet, de l'améliorer.
