# PipBoy

Le projet PipBoy est un projet d'environnement de travails dans Kubernetes.

## Infra

Le projet est baser sur trois namespace kubernetes:

- Auth: Qui contiendra toute la solution de gestion d'identité
- Guac: Qui contient la partie acces VNC/SSH aux container
- PipBoy: Contiendra l'infra PipBoy (un petit toolkit que je souhaite dev)
- UserNamespace: l'espace de dev des utilisateur (en autant d'exemplaire que nécessaire)

## Fonctionnalité

- Authentification avec KeyClock
- Création d'un namespace a la premiere authentification (UserNamespace)
- Accès aux container a travers Guacamole
- Accès a GUI-UserNamespace a travers Guacamole
