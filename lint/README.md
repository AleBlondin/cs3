# Les outils qualité

## Statique vs Dynamique

- statique: linter, formatter, typage
- dynamique: tests

## Le linter

Le plus connu en JS: [eslint](https://eslint.org/)

### Pourquoi ?

- éviter les bugs
- standardiser les manières de faire

### Mise en place

Installation `yarn add --dev eslint`

Configuration:
- via la commande `eslint --init`
- choix du:
    - framework
    - la specification ECMAScript
    - l'environnment
    - le superset
- partir d'un pré-ensemble de règles éprouvées plutôt que tout redécouvrir
- format du fichier de config en js plutôt que json:
    - checks de syntaxe
    - commentaires
- ne pas oublier de configurer son IDE ! Pour VScode rien à faire
- créer un script qui sera exécuté dans la CI
### Personnalisation

[Beaucoup d'options](https://eslint.org/docs/user-guide/configuring/):
- la gravité
- le détail

### Parsing simple
Exemple: Obliger l'utilisation de single ou double quotes

### L'AST

#### Exemple
Exemple: Interdire une syntaxe
On veut interdire l'utilisation de Date tel que:
``` js
const someDate = new Date()
```

Pourquoi ? Si on utilise une lib tel que dayjs qui a une timezone de configuré, alors que Date utlise la locale.

#### Sandbox
Utiliser un [explorateur d'AST](https://astexplorer.net/)

#### Ajout de la règle
no-restricted-syntax

- Bien penser à mettre un message d'erreur explicite

### Création de règle custom

#### Exemple 1
Recoder la règle précédente en partant du fichier no-date.js

#### Exemple 2
On veut empêcher le déploiement de notre application s'il manque des variables d'environnements. Pour cela on:
- créer un job CI qui check si toutes les variables du fichier .env.template ne sont pas définies sur les différents envs. => HORS SCOPE mais exemple [ici](./src/check-ci.mjs)
- créer une règle de linter qui détecte si des variables d'env sont utilisées dans le code sans être définies dans le .env.template => notre objectif
Dans notre cadre on enlève la partie lecture de fichier, on définira les variables d'env dans le fichier de la règle de linter plutôt que dans .env.template

Objectif:
yarn test doit être OK


#### Exemple 3
La même avec:
- gestion d'exception: certaines variables d'env n'ont pas à aller dans le .env.template
- lecture de fichier
