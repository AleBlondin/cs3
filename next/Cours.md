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
- Exporter une fonction `getStaticPaths` qui renvoie pour l'instant un tableau en dur `[1, 2, 3]`

## 1ère page générée par le serveur
