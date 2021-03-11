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

### Personnalisation

[Beaucoup d'options](https://eslint.org/docs/user-guide/configuring/):
- la gravité
- le détail

### Parsing simple
=> obliger l'utilisation de single ou double quotes
