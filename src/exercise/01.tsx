// Simple Data-fetching
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'
import {fetchPokemon, PokemonDataView, PokemonErrorBoundary} from '../pokemon'

let pokemon: any = null
let pokemonError: Error | null = null
const pokemonPromise = fetchPokemon('pikacha')
pokemonPromise
  .then(data => {
    pokemon = data
  })
  .catch(err => {
    pokemonError = err
  })

function PokemonInfo() {
  if (pokemonError) throw pokemonError
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
        <PokemonErrorBoundary>
          <React.Suspense fallback={'Loading pokemon ...'}>
            <PokemonInfo />
          </React.Suspense>
        </PokemonErrorBoundary>
      </div>
    </div>
  )
}

export default App
