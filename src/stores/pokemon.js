// src/stores/pokemon.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'


export const usePokemonStore = defineStore('pokemon', () => {
  const pokemonList = ref([])
  const images = ref({})
  const edits = ref({}) // stores nicknames or tags
  const search = ref('')

  async function fetchAllPokemon() {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100')
    const data = await res.json()
    pokemonList.value = data.results

    for (const p of data.results) {
      const r = await fetch(p.url)
      const d = await r.json()
      images.value[p.name] = d.sprites.front_default
    }
  }

  function editPokemon(name, data) {
    edits.value[name] = { ...(edits.value[name] || {}), ...data }
  }

  const filteredPokemon = computed(() =>
    pokemonList.value.filter(p =>
      p.name.toLowerCase().includes(search.value.toLowerCase())
    )
  )

  return {
    pokemonList,
    images,
    edits,
    search,
    fetchAllPokemon,
    editPokemon,
    filteredPokemon
  }
})
