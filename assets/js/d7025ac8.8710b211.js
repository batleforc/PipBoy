"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[665],{1669:function(e){e.exports=JSON.parse('{"blogPosts":[{"id":"concept","metadata":{"permalink":"/PipBoy/blog/concept","editUrl":"https://github.com/batleforc/PipBoy/tree/master/doc/blog/2020-01-14.md","source":"@site/blog/2020-01-14.md","title":"PipBoy ? Kezako ?","description":"Le projet PipBoy a pour objectif de mettre en place un environnement de travail sous kubernetes simplifier.","date":"2020-01-14T00:00:00.000Z","formattedDate":"January 14, 2020","tags":[{"label":"concept","permalink":"/PipBoy/blog/tags/concept"},{"label":"docker","permalink":"/PipBoy/blog/tags/docker"},{"label":"kubernetes","permalink":"/PipBoy/blog/tags/kubernetes"},{"label":"guacamole","permalink":"/PipBoy/blog/tags/guacamole"}],"readingTime":3.47,"truncated":true,"authors":[{"name":"Maxime Leriche","title":"D\xe9veloppeur de projet farfelue","url":"https://github.com/batleforc","imageURL":"https://github.com/batleforc.png","key":"batleforc"}],"nextItem":{"title":"First Blog Post","permalink":"/PipBoy/blog/first-blog-post"}},"content":"Le projet PipBoy a pour objectif de mettre en place un environnement de travail sous kubernetes simplifier.\\n\\nVous \xeates encore plus perdue ? Ce n\'est pas grave !\\n\\n## Pour les connaisseur\\n\\nSi vous avez un peu de connaissance en infrastructure cella peux \xeatre compar\xe9 a un serveur RDP ou chaque utilisateur aura un l\'\xe9quivalent d\'un docker personnelle. Si vous souhait\xe9 en savoir plus je vous invite a lire la suite de l\'article.\\n\\n## Pour les autre ? et les curieux ?\\n\\n\x3c!--truncate--\x3e\\n### Pr\xe9requis\\nAfin de comprendre la suite des explication il est n\xe9cessaire de conna\xeetre:\\n\\n- [un minimum docker](https://www.youtube.com/watch?v=caXHwYC3tq8) ou [beaucoup](https://www.youtube.com/watch?v=3c-iBn73dDE).\\n- Kubernetes et plus pr\xe9cis\xe9ment les pods et namespace (le reste sera n\xe9cessaire dans un autre article)\\n- [VNC](https://fr.wikipedia.org/wiki/Virtual_Network_Computing)\\n\\nA not\xe9:\\n\\n- Environnement == Namespace\\n- GuiContainer : Container docker avec une interface graphique\\n\\n### Et si on entrait dans le vif du sujet\\n\\n```plantuml V1\\nnode kubernetes{\\n  package \\"PipBoy\\"{\\n    node \\"Guacamole BackEnd\\" as guacd\\n    node \\"PipBoy BackEnd\\" as pipback\\n    node \\"PipBoy FrontEnd\\" as pipfront\\n    node KeyCloak as kc\\n  }\\n  package \\"UserNamespace\\"{\\n    node GuiContainer as gui\\n    node other\\n  }\\n}\\n\\nactor user\\n\\nuser --\x3e pipfront : Accede aux information de son namespace\\npipfront --\x3e kc : Authentifie l\'utilisateur\\npipfront --\x3e pipback : Acc\xe9de a kubernetes\\npipfront -[#black]-> pipback : R\xe9cup\xe9r\xe9 les information de\\\\nconnection aux container\\npipback -[#black]-> guacd : Demande une connection aux container Gui\\nguacd -[#black]-> gui : Cr\xe9er une connection entre\\\\nGuiContainer et l\'user\\nguacd -[#black]-> other: Cr\xe9er une connection\\\\nd\'un autre type si besoin\\n```\\n\\n#### Cas cible\\n\\nDans notre cas ou le cas de base souhait\xe9 notre utilisateur souhaite avec un PC poss\xe9dant peu de performance voir son t\xe9l\xe9phone acc\xe9der a un pc pourvu d\'un IDE (Vscode) ainsi que de docker ou un \xe9quivalent.\\n\\n#### Authentification\\n\\nA cette fin il devra ce connecter a son futur meilleur amis PipBoy!\\n\\nLe processus d\'authentification n\'est pas g\xe9rer par PipBoy mais par un Gestionnaire d\'identit\xe9 ([KeyCloak](https://www.keycloak.org/)).\\n\\n#### Namespace\\n\\nUne fois authentifi\xe9 deux cas de figure:\\n\\n- votre kubernetes namespace a \xe9t\xe9 configurer par un de vos administrateur ? vous pouvez donc continuez votre utilisation\\n- votre namespace na pas \xe9t\xe9 cr\xe9er ? veuillez contact\xe9 votre administrateur.\\n\\n#### Connection\\n\\nLa connection pr\xe9coniser vers le container GUI est une connection de type VNC, le container \xe9tant con\xe7u afin de supporter une interface graphique.\\n\\nMais le syst\xe8me Guacamole permet bien plus que du VNC telle que:\\n\\n- RDP : Remote Desktop Protocol => Support\xe9 principalement par Windows\\n- SSH : Secure Shell => Protocol support\xe9 par pratiquement tout les syst\xe8me.\\n- Kubernetes => Acc\xe8s directe aux container sans n\xe9cessit\xe9 de SSH\\n\\nHors Guacamole viens de base avec son propre Client mais celui ci ne permet pas une gestion automatis\xe9 des clients comme souhait\xe9.\\n\\nAfin de r\xe9soudre ce probl\xe8me la [librairie js guacamole](https://guacamole.apache.org/doc/gug/guacamole-common-js.html) sera impl\xe9menter dans PipBoy Front.\\n\\nIl peut \xeatre envisageable d\'ajouter la possibilit\xe9 de ce connecter a des appareille hors de kubernetes si cella s\'av\xe8re utile dans la suite du d\xe9veloppement.\\n\\n#### Ensuite ?\\n\\nUne fois connect\xe9 a une cible l\'utilisateur aura autant de possibilit\xe9 qu\'un acc\xe8s avec le client Guacamole:\\n\\n- Son : Transfert du son en provenance de la cible.\\n- Multiple connection ? Une fonctionnalit\xe9 encore en attente d\'approbation.\\n- Clavier/souris, possibilit\xe9 d\'envoy\xe9 le flux du clavier et de la souris vers la cible.\\n- Presse papier : Possibilit\xe9 de partager des fichier avec la cible.\\n- Transfert de fichier: Permet d\'envoy\xe9 ou recevoir des fichier avec la cible.\\n- Clavier sur l\'\xe9cran: Facilite l\'acc\xe8s a partir d\'une tablette en \xe9mulant un clavier sur l\'\xe9cran.\\n\\n## Plus de fonctionnalit\xe9 ?\\n\\nUn acc\xe8s distant et facile a votre environnement c\'est bien et suffisant pour une V1 mais dans notre cas une on ne veux pas s\'arr\xeater uniquement la.\\n\\n### CRUD kubernetes\\n\\nAfin de pouvoir acc\xe9der a cette environnement il serais pratique de pouvoir cr\xe9er des objet dans celui ci. A cette fin l\'ajout d\'un \xe9diteur de Yaml est une possibilit\xe9 envisag\xe9 tres fortement !\\n\\nEn plus de l\'ajout une visualisation des object pr\xe9sent dans le kubernetes et leur visualisation sera possible.\\n\\nVous souhaitez suivre l\'avanc\xe9e du projet ? [Venez me rejoindre sur github et pens\xe9 a mettre une \xe9toile sur le projet](https://github.com/users/batleforc/projects/1)"},{"id":"first-blog-post","metadata":{"permalink":"/PipBoy/blog/first-blog-post","editUrl":"https://github.com/batleforc/PipBoy/tree/master/doc/blog/2020-01-13.md","source":"@site/blog/2020-01-13.md","title":"First Blog Post","description":"Hello, Aloha, Bonjour,","date":"2020-01-13T00:00:00.000Z","formattedDate":"January 13, 2020","tags":[{"label":"Hello","permalink":"/PipBoy/blog/tags/hello"}],"readingTime":0.185,"truncated":false,"authors":[{"name":"Maxime Leriche","title":"D\xe9veloppeur de projet farfelue","url":"https://github.com/batleforc","imageURL":"https://github.com/batleforc.png","key":"batleforc"}],"prevItem":{"title":"PipBoy ? Kezako ?","permalink":"/PipBoy/blog/concept"}},"content":"Hello, Aloha, Bonjour,\\n\\nEt surtout bienvenue dans ce premier \\"Post\\" du projet PipBoy.\\n\\nComme toujours avec moi le nom n\'est pas contractuelle et est vou\xe9 a chang\xe9.\\n\\nEn vous souhaitant une bonne d\xe9couverte de ce projet farfelue."}]}')}}]);