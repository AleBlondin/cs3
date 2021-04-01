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
  return { paths, fallback: false };
}

export async function getStaticProps({ params: { id } }) {
  return { props: { name: pokemonIdToNameMap[id] } };
}

export default Pokemon;
