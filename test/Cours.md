# Cours centrale 5 - tests

### Setup initial de test

### Objectifs d'un test front ?

- si je refactor mon code mais que les comportement / UI restent les mêmes, les tests restent vert
- si mon test est vert, alors mon code fonctionne

#### Comment on debug ?

```
const renderedCounter = render(<Counter />);
console.log(renderedCounter.debug());
```

#### Ce qu'il faut mocker

- la lib de gestion du state -> et encore pas forcémment.
- les calls networks (cf exemple mockQuery)
  - mocker la fonction de fetch
  - faire un mock global des ressources serveur
  - générer ce mock automatiquement
- l'horloge (cf exemple mockDebounce)

### Le snapshot testing

Prendre une photo instantannée d'un composant, du résultat d'une fonction.

Inclus dans la plupart des tests runners.

Les limites:

- Surtout snapshoter le DOM (le rendu final pour le user), et pas le Virtual DOM (l'objet JS manipulé par React par exemple)
- Snapshot dur à lire dans une PR
- On perd l'intention du test. Dans la totalité de ce qui est snapshoté, quel est l'élément important ?
- Beaucoup de faux positifs. On fait une modif d'un détail d'implem, on a 10 tests qui passent au rouge.

C'est encore pire si on ne le fait pas sur de l'UI mais sur des fonctions pures.

Comment ca peut être utile ?

- snapshoter chaque page. Quand on modifie un composant, tous les tests rouges sont toutes les pages potentiellement impactées. Du coup l'info n'est plus le contenu du snapshot mais le fait que le test soit cassé.
- quand on travaille sur du code que l'on ne comprend pas, snapshoter sa sortie. Après refacto on vérifie que l'on n'a rien cassé.

### Le property based testing

https://github.com/dubzzz/fast-check

### Le mutation testing

https://stryker-mutator.io/

Mesurer la qualité de ses tests, plus particulièrement traquer les faux négatifs.
