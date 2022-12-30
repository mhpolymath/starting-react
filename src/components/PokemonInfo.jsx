import React from "react"; 
import { useContext } from "react";
import PokemonType from "../PokemonType";
import PokemonContext from "./PokemonContext";
//#endregion


//PokemonInfo
//#region
const PokemonInfo = () => {
  const {selectedPokemon} = useContext(PokemonContext);
  return(
    <div>
    <h2>{selectedPokemon.name.english}</h2>
    <table>
      <tbody>
        {Object.keys(selectedPokemon.base).map((key) => (
          <tr key={key}>
            <td>{key}</td>
            <td>{selectedPokemon.base[key]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};

PokemonInfo.propTypes = PokemonType;
//#endregion

export default PokemonInfo;