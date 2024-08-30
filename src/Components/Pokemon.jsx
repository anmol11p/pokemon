import React, { useEffect, useState } from "react";
import styles from "./pokemon.module.css";
import PokemonCard from "./PokemonCard";
const Pokemon = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, seterror] = useState(null);
  const [input, SetInputValue] = useState("");
  const [searchData, SetSearchData] = useState([]);
  const fetchpokemon = async () => {
    try {
      const url = "https://pokeapi.co/api/v2/pokemon?limit=120";
      const promise = await fetch(url);
      const response = await promise.json();

      //fetch additional data for each Problem
      const pokemonArray = response.results.map(async (pokemon) => {
        try {
          const promise2 = await fetch(pokemon.url);
          const response2 = await promise2.json();
          return response2;
        } catch (error) {
          setLoading(false);
        }
      });
      const results = await Promise.all(pokemonArray);
      setData(results);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      seterror(error.message);
    }
  };
  const handleOnchange = (e) => {
    const value = e.target.value.toLowerCase();
    SetInputValue(value);
    const searcharray = data.filter((currElem) => {
      return currElem.name.includes(input);
    });

    value.length < 1 ? SetSearchData([]) : SetSearchData(searcharray);
    value.length < 1
      ? (document.title =
          "Pokemon-all details about pokemons, their ability,weight,experiensce,attack")
      : (document.title = `Searching for ${
          value.charAt(0).toUpperCase() + value.slice(1)
        }`);
  };

  useEffect(() => {
    fetchpokemon();
    document.title =
      "Pokemon-all details about pokemons, their ability,weight,experiensce,attack";
  }, []);
  return (
    <>
      {error && (
        <span className="flex flex-wrap justify-center items-center text-3xl my-5">
          <h1 className={styles.loading}>{error}</h1>
        </span>
      )}
      {loading && (
        <h1
          className={
            styles.loading +
            " text-3xl text-white flex justify-center font-bold items-center "
          }
        >
          Loading....
        </h1>
      )}
      {!loading && !error && (
        <h1 className={styles.heading}>Let's catch the Pokémon</h1>
      )}
      {error && <p>{error}</p>}

      <div className="container">
        <span className="flex justify-center items-center my-3 ">
          {!loading && !error && (
            <input
              type="text"
              className=" text-black pl-2 rounded-sm"
              value={input}
              placeholder="Enter Pokmon Name"
              onChange={handleOnchange}
            />
          )}
        </span>
        {searchData.length < 1 ? (
          <div className="row">
            {data.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
        ) : (
          <div className="row">
            {searchData.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Pokemon;
