
const fetch = require('node-fetch')

function loadPokemonData(pokemonName) {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then(response => response.json())
}

function urlsOfMovements(pokemonData) {
  let arrayWithUrls = []

  for (let dataMove of pokemonData.moves) {
    arrayWithUrls.push(dataMove.move.url)
  }
  return arrayWithUrls
}

function fetchMovement(urls) {
  let fetchedUrls = []

  urls.forEach((url) => {
    fetchedUrls.push(fetch(url)
      .then(response => response.json()))
  })
  return fetchedUrls
}

function getAllNames(jsonData){
  let spanishName = []

  jsonData.forEach(move => {
    move.names.forEach(name => {
      if (name.language.name === 'es') {
        spanishName.push(name.name)
      }
    })
  })
  return spanishName.sort()
}

function spanishMovements(pokemonName) {
  loadPokemonData(pokemonName)
    .then(response => urlsOfMovements(response))
    .then(urls => Promise.all(fetchMovement(urls)))
    .then(resolvedUrls => console.log(getAllNames(resolvedUrls)))
    .catch(() => console.log("Error"))
}

spanishMovements('bulbasaur')
spanishMovements('pikachu')
