# youtubeApp (� changer le nom) by Bill

<h2>Concept de l'application</h2>

Tu pensais �tre un feignant, YoutubeApp t'aide et t'am�ne un cran plus loin.
Cette application permet � un utilisateur de rechercher des videos Youtube, de les lancer directement sur son ordinateur et ce � l'aide uniquement de son t�l�phone portable.

<h3>Quelles sont les fonctionnalit�s de l'application ?</h3>

    - chercher une video
    - lancer une video sur son ordinateur
    - stop/play/pause
    - mute/unmute
    - changer le volume

<h3>Technologies utilis�es</h3>

  <h4>C�t� serveur :</h4>

Serveur node.js avec Express.js/socket.io/MongoDB.
Utiliser node.js et socket.io permet une utilisation rapide/facile des websockets et donc une communication en temps r�el.

  <h4>C�t� Mobile</h4>

Ionic/angular/ui-router/socket.io, technologies prises en fonction de ionic lui m�me.

  <h4>C�t� Desktop</h4>

Electron.js pour la creation de l'application. Electron permet la cr�ation d'application desktop avec du javascript/html/css.
J'ai choisi Electron plutot que nw.js car electron semble �tre d�velopp� bien plus activement, j'y vois donc un int�ret certains pour les prochaines ann�es.
Utilisation de Jquery pour le front-end pour un d�veloppement rapide (je risque de le changer lorsque je continuerai � d�velopper l'application).

<h3>Difficult�s Rencontr�es</h3>

Le plus dur dans ce projet fut le d�veloppement triplatform (desktop, serveur, mobile) en m�me temps et le fait que les trois sont �normement li�s avec les sockets, la recherche d'erreurs pouvait donc �tre fastidieuse. Le d�veloppement avec electron.js fut aussi une premi�re, il m'a donc fallut apprendre � utiliser cette technologie.

Globalement, le projet n�c�ssiterais que je mette tout sur papier, r�fl�chisse aux solutions/besoins et d�cider ensuite de la direction � prendre au niveau technologie, structure et fonctionnalit�s futures.

J'esp�re avoir le temps de continuer le projet, de l'am�liorer.