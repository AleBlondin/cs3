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

![redux data flow](https://redux.js.org/assets/images/one-way-data-flow-04fe46332c1ccb3497ecb04b94e55b97.png)

### Exemple

On a migré les compteurs pour que leur state soit géré par redux. Ce qu'il faut retenir:

- Store:
  - création d'un store unique avec une valeur par défaut
  - on peut faire de la composition pour avoir des states plus atomiques
- DevX:
  - installation sur chrome de l'extension redux
  - on peut suivre les actions et l'évolution du state -> debug + time travel
  - \o/ nos tests sont générés automatiquement !
- Intégration React / Redux
  - Dispatch
  - Select

### TODO 1

Faire en sorte que le vault ne s'ouvre que quand les 3 compteurs sont égaux.

2 méthodes: rajouter un state dans redux OU le déduire dans le composant.

### TODO 2

Logguer toutes les actions qui se passent

- Méthode naïve: création d'un nouveau reducer qui loggue + renvoi le même state
- Méthode meilleure: utilisation d'un middleware

## XState

https://github.com/davidkpiano/xstate

### Principes

- des états définis
- des transitions permises seulement de certains états à états

Exemple: tunnel de subscription

```
Machine({
  id: 'form tunnel',
  initial: 'idle',
  states: {
    idle: {
      on: {
        GO_TO_FORM: 'form_1'
      }
    },
    form_1: {
      on: {
        CONTINUE: 'form_2'
      }
    },
    form_2: {
      on: {
        CONTINUE: 'form_3',
        GO_BACK: 'form_1'
      }
    },
    form_3: {
      on: {
        SUBMIT: 'success',
        GO_BACK: 'form_2'
      }
    },
    success: {
      type: 'final'
    }
  }
})
```

TODO: feu tricolore

Demo complexe: https://xstate.js.org/viz/

### Intégration avec une UI (React)

### Garder les inputs + contexte

On veut que sur l'écran du succès, on ait les inputs tapés sur les 3 formulaires.
On veut aussi que lorsqu'on revienne en arrière on voit ce qu'on a tapé.

On va donc transformer les events qui étaient des strings (`"CONTINUE"`) en objet (`{"type: "CONTINUE": value: "my_input"`)

- passer une valeur avec un event: https://xstate.js.org/docs/guides/events.html
- le contexte: https://codesandbox.io/s/xstate-react-template-3t2tg
- récupération de la valeur de l'input: exemple dans le composant form1

### Utilisation des guards

Conditionner des transitions.

Ne pas autoriser de continuer si l'utilisateur n'a pas rempli de valeur d'input.
