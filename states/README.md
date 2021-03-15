# States

## React state

### Rappels
- Pourquoi on utilise un hook au lieu de déclarer un state avec const ?
- Pourquoi on utilise le setter de state plutôt que de muter l'objet ?

### State inter-dépendants

Objectif: faire en sorte que le vault afficher ouvert quand les valeurs des 3 compteurs sont identiques.

Pour cela on va remonter le state des compteurs.

1. Remonter le state jusqu'au niveau ou en a besoin
2. Supprimer les states dont on n'a pas besoin:
    - car il se déduit d'un autre state
    - penser à la mémoisation si le calcul de ce state déduit est complexe

## Redux state

### Principes

https://redux.js.org/understanding/thinking-in-redux/three-principles

- Une seule source de vérité
- Le state est immutable (lecture seule)
- Un changement d'état se fait par une fonction pure: 1 state = 1 state précédent + 1 action
- CQRS: Command Query Responsability Segregation

## XState

https://github.com/davidkpiano/xstate