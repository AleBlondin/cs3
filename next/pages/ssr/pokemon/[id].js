import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const pokemonIdToNameMap = {
  1: "bulbizarre",
  2: "salamèche",
  3: "carapuce",
  4: "rondoudou",
};

const Pokemon = () => {
  const [name, setName] = useState("");
  const {
    query: { id },
  } = useRouter();

  useEffect(() => {
    const fetchPokemon = async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      setName((await res.json()).name);
    };

    fetchPokemon();
  });

  return <div>{name}</div>;
};

export async function getServerSideProps({ params: { id } }) {
  return { props: {} };
}

export default Pokemon;
