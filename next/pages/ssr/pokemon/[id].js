const pokemonIdToNameMap = {
  1: "bulbizarre",
  2: "salamèche",
  3: "carapuce",
  4: "rondoudou",
};

const Pokemon = ({ name }) => {
  return <div>{name}</div>;
};

export async function getServerSideProps({ params: { id } }) {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100");
  const pokemonIdToNameMap = (await res.json()).results;
  return { props: { name: pokemonIdToNameMap[id].name } };
}

export default Pokemon;
