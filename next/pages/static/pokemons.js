const Pokemon = ({ pokemons }) => {
  return (
    <div>
      {pokemons.map((pokemon) => (
        <div>{pokemon}</div>
      ))}
    </div>
  );
};

export async function getStaticProps() {
  return { props: { pokemons: ["bulbizarre", "salamèche", "carapuce"] } };
}

export default Pokemon;
