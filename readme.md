<div align="center">
<img src=https://github.com/SkynixFr/PokeClick/blob/master/assets/PokeclickLogo.png?raw=true alt=Pokeclick />
</div>

PokeClick est un jeu simple dans le monde de Pokémon se basant sur les jeux de type clicker.

## Features Disponibles

-  Création, modification déconnexion d'un compte utilisateur
-  Authentification sécurisée d'un utilisateur
-  Récupération des données d'un utilisateur connecté
-  Choix du starter
-  Click Automatique et calcul du DPS automatique
-  Team de pokémons basique et améliorations possible
-  Système de succès et détection
-  Détection de la hors connexion

## Stack

-  ![typescript](https://img.shields.io/badge/typescript-5.1.6-blue.svg)
-  ![Native React](https://img.shields.io/badge/native_react-0.73.0-yellow)
-  ![Firebase](https://img.shields.io/badge/Firebase-10.7.1-red)
-  ![Expo](https://img.shields.io/badge/expo-49.0.21-green)

## Cahier des charges

On vise à faire un Idle Game lié à Pokémon, le principe est qu’après la connexion au compte client, il a accès à l’Idle.
Le principe est le suivant :

-  Le choix du starter est possible par l’utilisateur : (3 choix parmis pokémon feu/eau/plante + pokémon bonus pikachu)
-  Il pourra laisser tourner en fond pour le jeu clique à sa place ou qu’il puisse cliquer de lui même pour gagner des Pokédollars $$$
   Avec ses pokédollars il aura accès à une boutique où il pourra acheter divers items comme des accélérateur (attaque +, clique +) / des pokéballs etc…
-  Avec les pokéballs il pourra recruter d’autres pokémons ou augmenter le niveau de ses pokémons ( à noter que le niveau des pokémons augmenteront avec des pokédollars( à acheter avec des pokédollars sur le site)) (Niveau Max : 100)

## Fonctionnalités Mobiles Visés :

-  Notification : Notification régulière de l'utilisateur pour avoir son état de jeu et de l'inciter à revenir (non implémenter)
-  Gyroscope : Permettant de gagner de la monnaie en jeu.

## Features prévus mais non implémentés :

-  Page boutique avec de la monnaie payante
-  Farm en mode hors ligne (farm automatique lorsque l'utilisateur n'est pas connecté à l'application)
-  Système de paramètre pour paramètrer l'affichage des dégats en exponentielle ou non (pour l'instant à partir exponentielle à partir de 10 000)
-  Gestion des ascensions (Gestion des ascensions pokémons après le Lv.100)
-  Gestion des évolutions des upgrades (Gestion lorsqu'un pokémon obtient un certain Lv. on change de pokémon pour qu'il évolue)

## Setup

-  Télécharger le code source

```sh
git clone https://github.com/SkynixFr/PokeClick.git
```

-  Installer les dépendances

```sh
npm install
```

-  Initialisation de la connexion à la base de données :

Un fichier `environmentsExample.tsx` recense toutes les variables à compléter dans un fichier `environments.tsx`

-  Lancement de l'application

```sh
npx expo start
```

<div align="center">

<image src="https://github.com/SkynixFr/PokePI/blob/main/assets/pikachu-oh-yeah.gif?raw=true" alt=OhYeahPikachu />

</div>

## Contributeurs

<div align=center>

<img src="https://github.com/SkynixFr.png" width="100" style="border-radius: 50%">
<img src="https://github.com/Luffysonic.png" width="100" style="border-radius: 50%">
<img src="https://github.com/Suranewt.png" width="100" style="border-radius: 50%">

</div>
