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
