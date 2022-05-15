// Simple Data-fetching
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'
import {fetchPokemon, PokemonDataView, PokemonErrorBoundary} from '../pokemon'

function createResource<ResourceType>(promise: Promise<ResourceType>) {
  let data: ResourceType | null = null
  let fetchErr: Error | null = null

  let status: 'pending' | 'resolved' | 'rejected' = 'pending'

  promise.then(
    dt => {
      status = 'resolved'
      data = dt
    },
    err => {
      status = 'rejected'
      fetchErr = err
    },
  )

  return {
    read() {
      switch (status) {
        case 'pending':
          throw promise
        case 'rejected':
          throw fetchErr
        default:
          return data
      }
    },
  }
}

const pokemonResource = createResource(fetchPokemon('Pikachu'))

function PokemonInfo() {
  const pokemon = pokemonResource.read()
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
