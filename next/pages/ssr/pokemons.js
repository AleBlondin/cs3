const Pokemon = ({ pokemons }) => {
  return (
    <div>
      {pokemons.map((pokemon) => (
        <div>{pokemon}</div>
      ))}
    </div>
  );
};

export async function getServerSideProps() {
  return { props: { pokemons: ["bulbizarre", "salamèche", "carapuce"] } };
}

export default Pokemon;
