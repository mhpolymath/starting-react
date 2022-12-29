//#import-region
import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import styled from '@emotion/styled';
import { Button } from '@material-ui/core';

//#import-endregion

//#PokemonRow-region
const PokemonRow = ({pokemon, onSelect}) => (
  <tr>
    <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(", ")}</td>
    <td>
      <Button 
      variant="contained" 
      color="primary" 
      onClick={() => onSelect(pokemon)}>More Info</Button>
    </td>
  </tr>
);

PokemonRow.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.shape({
      english: PropTypes.string.isRequired,
    }),
    type: PropTypes.arrayOf(PropTypes.string.isRequired),
  }),
  onSelect: PropTypes.func.isRequired,
}
//#PokemonRow-endregion

//#PokemonInfo-region
const PokemonInfo = ({name , base}) => (
  <div>
    <h1>{name.english}</h1> 
    <table className='props-table'>
      <thead>
        <tr>
          <th>Proprety</th>
          <th>Value</th>
        </tr>
      </thead>

      <tbody>
        {Object.keys(base).map((key) => (
          <tr key={key}>
            <td>{key}</td>
            <td>{base[key]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

PokemonInfo.propTypes = {
  name: PropTypes.shape({
    english: PropTypes.string.isRequired,
  }),
  base: PropTypes.shape({
    HP: PropTypes.number.isRequired,
    Attack: PropTypes.number.isRequired,
    Defense: PropTypes.number.isRequired,
    "Sp. Attack": PropTypes.number.isRequired,
    "Sp. Defense": PropTypes.number.isRequired,
    Speed: PropTypes.number.isRequired,
  }),
};
//#PokemonInfo-endregion

//#Styles-region

const Title = styled.h1`
text-align: center`;

const TwoColumnLayout = styled.div`
  display:grid;
  grid-template-columns: 70% 70%;
  grid-column-gap: 1rem;
  `;

const Container = styled.div`
  margin: auto;
  width: 800px;
  padding-top: 1rem;
  `;

const Input = styled.input`
  width: 100%;
  font-size: x-large;
  padding: 0.2rem;
`;

//#Styles-endregion

//#AppComp-region


function App(){
  const [filter, filterSet] = React.useState("");
  const [pokemon, pokemonSet] = React.useState([]);
  const [selectedItem, selectedItemSet] = React.useState(null);
  
  React.useEffect(() => {
    fetch('http://localhost:3000/starting-react/pokemon.json')
      .then((resp) => resp.json())
      .then((data) => pokemonSet(data))});

  
  

  return (
    <Container>
      <Title>Pokemon Search</Title>
      
      <TwoColumnLayout>
        <div>
          <Input
          value={filter}
          onChange={(evt) => filterSet(evt.target.value)}
          />
          <table className="thine-table" width="100%">
              <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {pokemon
              .filter((pokemon) => (pokemon.name.english.toLowerCase().includes(filter.toLowerCase())))
              .slice(0,20)
              .map((pokemon) => (
              <PokemonRow 
              pokemon={pokemon} 
              key = {pokemon.id} 
              onSelect={(pokemon) => selectedItemSet(pokemon)}
              />
              ))}
              
            
            </tbody>
          </table>
        </div>
        {selectedItem && <PokemonInfo {... selectedItem}/>}
      </TwoColumnLayout>      
    </Container>
  );
}
//#AppComp-endregion

export default App;

