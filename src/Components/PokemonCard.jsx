import React from "react";
import styles from "./pokemon.module.css";
const PokemonCard = ({ pokemon }) => {
  const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };
  return (
    <>
      <div className="col-md-3 my-3" key={pokemon.id}>
        <div className={`card ${styles.list}`} style={{ width: "18rem" }}>
          <span className="flex justify-center items-center my-3">
            <img
              src={pokemon.sprites.other.dream_world.front_default}
              className={`${styles.pokemonIMG} card-img-top`}
              alt={pokemon.name}
            />
          </span>

          <div className="card-body ">
            <h5
              className={`${styles.pokemonName} card-title text-2xl flex justify-center font-bold`}
            >
              {capitalize(pokemon.name)}
            </h5>
            <span
              className={
                styles.types +
                "  flex  justify-center items-center gap-2 text-white font-bold"
              }
            >
              {pokemon.types.map((element, index) => {
                return (
                  <p key={index} className=" bg-green-500 px-2 rounded-full ">
                    {capitalize(element.type.name)}
                  </p>
                );
              })}
            </span>
            <div className="text-black flex my-2">
              <span className="flex items-center pl-1">
                <h1 className="font-bold">Height: </h1>
                {(pokemon.height)}
              </span>
              <span className="flex items-center pl-2">
                <h1 className="font-bold">Weight: </h1> {pokemon.weight/10} <h1 className="text-green-700 font-bold">Kg</h1>
              </span>
              <span className="flex items-center pl-1 pr-5">
                {" "}
                <h1 className="font-bold">Speed:</h1>{" "}
                {pokemon.stats[5].base_stat}
              </span>
            </div>

            <div className="text-black grid gap-2 my-2">
              <span className="flex items-center">
                <h1 className="pl-2">{pokemon.base_experience}</h1>
                <h1 className="pl-20"> {pokemon.stats[1].base_stat} </h1>
                <h1 className="pl-8 text-sm text-red-400 font-extrabold"> {pokemon.abilities[0].ability.name} </h1>
              </span>
              <span className="flex items-center gap-3">
                <h1 className="font-bold">Experience</h1>  <h1 className="font-bold">Attack</h1> <h1 className="font-bold">Abilities</h1>
              </span>
           
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PokemonCard;
