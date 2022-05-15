// Simple Data-fetching
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'
import { fetchPokemon, PokemonDataView } from '../pokemon'

let pokemon: any = null
const pokemonPromise = fetchPokemon('pikachu')
pokemonPromise.then(data => {
  pokemon = data
})

function PokemonInfo() {
  if (!pokemon) {
    console.log('Gonna throw')
    throw pokemonPromise
  }

  console.log(pokemon)

  return (
    <div>
      <div className="pokemon-info__img-wrapper">
        <img src={pokemon.image} alt={pokemon.name} />
      </div>
      <PokemonDataView pokemon={pokemon} />
    </div>
  )
}

function App() {
  return (
    <div className="pokemon-info-app">
      <div className="pokemon-info">
        <React.Suspense fallback={'loading...'}>
          <PokemonInfo />
        </React.Suspense>
      </div>
    </div>
  )
}

export default App
