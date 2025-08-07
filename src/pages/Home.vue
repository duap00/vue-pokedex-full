<template>
  <div class="container-fluid bg-dark text-white min-vh-100 py-4 text-center">
    <!-- Logo -->
    <img
      src="/pokemon_logo.png"
      alt="Pokémon Logo"
      class="img-fluid mb-4"
      style="max-width: 300px;"
    />

    <!-- Search Bar -->
    <div class="row justify-content-center mb-3">
      <div class="col-md-6">
        <input
          v-model="store.search"
          type="text"
          class="form-control"
          placeholder="Search Pokémon..."
        />
      </div>
    </div>

    <!-- Pokémon Cards -->
    <div class="row">
      <div
        v-for="pokemon in store.filteredPokemon"
        :key="pokemon.name"
        class="col-md-3 mb-4"
      >
        <div class="card text-center h-100">
          <img
            v-if="store.images[pokemon.name]"
            :src="store.images[pokemon.name]"
            class="card-img-top"
            alt="Pokemon"
          />
          <div class="card-body">
            <h5 class="card-title text-capitalize">
              {{ store.edits[pokemon.name]?.nickname || pokemon.name }}
            </h5>
            <router-link
              :to="`/pokemon/${pokemon.name}`"
              class="btn btn-primary btn-sm"
            >
              View Details
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
// ✅ FIXED: use relative path instead of "@"
import { usePokemonStore } from '../stores/pokemon'

const store = usePokemonStore()

onMounted(() => {
  if (store.pokemonList.length === 0) {
    store.fetchAllPokemon()
  }
})
</script>

<style>
body {
  background-color: #121212;
}

.card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}
</style>

