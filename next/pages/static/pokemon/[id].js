const pokemonIdToNameMap = {
  1: "bulbizarre",
  2: "salamèche",
  3: "carapuce",
  4: "rondoudou",
};

const Pokemon = ({ name }) => {
  return <div>{name}</div>;
};

export async function getStaticPaths() {
  const ids = ["1", "2", "3"];
  const paths = ids.map((id) => ({
    params: {
      id,
    },
  }));
  return { paths, fallback: true };
}

export async function getStaticProps({ params: { id } }) {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100");
  const pokemonIdToNameMap = (await res.json()).results;
  return { props: { name: pokemonIdToNameMap[id].name } };
}

export default Pokemon;
