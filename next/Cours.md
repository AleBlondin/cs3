# SSR & Static rendering. Zoom sur NextJS

## Rappels

Lien avec les archis vues lors du cours 1.

- Server side rendering
- Static rendering

Next est un framework, donc il faut suivre leur manière de faire.
On ne peut pas facilement cacher une page rendue côté serveur. Il faut utiliser ce qui est fourni, par exemple l'incremental static rendering.

## 1ère page générée en statique

On crée une page qui affiche une liste de pokemons. Pour l'instant ceux-ci sont en durs, on les fetchera ensuite dynamiquement.

Attention, en dev, getStaticProps est appelé à chaque requête ! Pour bien se rendre compte du comportement après déploiement, on fait `js yarn build` & `js yarn start`.
On lit dans la console ce qui est buildé.

On observe que ce qui est servi au front est bien du html. Ce sera pareil pour le SSR mais ce n'est pas le cas pour une SPA par exemple.

### Pages dynamiques

TODO:

- regarder:https://nextjs.org/docs/basic-features/pages#scenario-2-your-page-paths-depend-on-external-data
- Créer une page dont l'URL est en /pokemon/[id]
- Créer une fonction `getStaticProps` qui utilise la map suivante:
  <pre>
  const pokemonIdToNameMap = {
    1: "bulbizarre",
    2: "salamèche",
    3: "carapuce",
    4: "rondoudou",
  }
  </pre>
  et passe le nom du pokemon correspondant à l'id de l'url au composant page.
- Exporter une fonction `getStaticPaths` qui renvoie pour l'instant un tableau en dur `{paths: [{params: {id; 1}}, ...2, ...3]}`

A quoi sert la clé fallback ?
Permet de trouver l'équilibre entre un temps de build court et une bonne perf pour les users.

### Fetcher des vraies données

TODO:

Les noms des pokemons sont maintenant à récupérer via l'API https://pokeapi.co/

- remplacer la constante pokemonIdToNameMap par un call à https://pokeapi.co/api/v2/pokemon?limit=100

### Incremental Static Regeneration

Regénérer une page statique après que X secondes se soient écoulées: https://tools.ietf.org/html/rfc5861

Limite: 1 utilisateur peut se faire servir une page extrêmement vieille si la page n'a pas été requêtée depuis longtemps.

Mise en place via le flag `revalidate`.
Pour voir ça, on affiche sur la page une date passée en props via getStaticProps.

## 1ère page générée par le serveur

TODO:

On peut modifier la page précédente pour qu'elle soit rendue à chaque requête. Pour ça on remplace `getStaticProps` par `getServerSideProps`.
Pour cela créer un dossier pages/ssr/pokemon, et implémenter la page dedans.

Lancer un `yarn build` et checker que les pages SSRs ne sont pas pré-rendues.

Afficher la date de rendu de la page.

C'est assez semblable à de l'incremental static regeneration, sauf que le html n'est pas stocké / caché.

## JS exécuté côté front

### Récap

Dans toutes les pages qu'on a vues, que ce soit du statique ou du SSRs, le client reconstruit quand même le html avec le JS (SPA-like). Pour le voir:

- au build regarder le js généré
- ouvrir les dev tools React

Donc on peut faire tout ce qu'on ferait avec une SPA. Notamment:

- de la pagination front

Mais attention, tous le JS que vous écrivez n'est pas envoyé au front. Pour cela copier votre code dans https://next-code-elimination.vercel.app/ et regarder ce qui reste.

Dangers d'écrire tout son code dans la même app:

- de la logique métier peut fuiter depuis le back vers le front
- des données sensibles peuvent fuiter depuis le back vers le front

### Pagination front

Objectif: ajouter un bouton next et previous qui permet de faire respectivement +1 et -1 à l'id de la page pokemon.

Pour cela on va utiliser:

- le composant `Link` de `next/link` pour la navigation côté front
- `useRouter` l'id de l'url et l'incrémenter.
- fetch dans un useEffect + useState pour récupérer le nom du pokemon à afficher

TODO 1: avec un id en dur (`const id = 3`), ne plus passer le name en props de la page mais le fetcher dans un useEffect.
Est-il judicieux de changer l'endpoint de l'API pokemon ?

TODO 2: récupérer l'id via `useRouter`.

TODO 3: mettre en place la pagination avec un previous et next.
