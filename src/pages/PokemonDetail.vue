<template>
  <div class="container py-4 text-white" v-if="pokemon">
    <!-- Pokémon Name or Nickname -->
    <h1 class="text-capitalize text-center mb-3">
      {{ store.edits[name]?.nickname || pokemon.name }}
    </h1>

    <!-- Pokémon Image -->
    <img :src="pokemon.sprites.front_default" class="d-block mx-auto mb-4" />

    <!-- Nickname Editor -->
    <form @submit.prevent="saveNickname" class="mb-4 w-50 mx-auto">
      <div class="input-group">
        <input
          v-model="nickname"
          type="text"
          class="form-control"
          placeholder="Enter nickname"
        />
        <button type="submit" class="btn btn-primary">Save</button>
      </div>
      <p v-if="nicknameSaved" class="text-success mt-2">✅ Nickname saved!</p>
    </form>

    <!-- Info List -->
    <ul class="list-group mt-4">
      <li class="list-group-item bg-dark text-white">Height: {{ pokemon.height }}</li>
      <li class="list-group-item bg-dark text-white">Weight: {{ pokemon.weight }}</li>
      <li class="list-group-item bg-dark text-white">Base Experience: {{ pokemon.base_experience }}</li>
      <li class="list-group-item bg-dark text-white">
        Types:
        <span v-for="t in pokemon.types" :key="t.type.name">
          {{ t.type.name }}&nbsp;
        </span>
      </li>
    </ul>

    <!-- Back Button -->
    <router-link to="/" class="btn btn-secondary mt-4">← Back to Home</router-link>
  </div>

  <div v-else class="text-white text-center py-5">
    Loading Pokémon...
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { usePokemonStore } from '../stores/pokemon'

const route = useRoute()
const name = route.params.name
const pokemon = ref(null)
const nickname = ref('')
const nicknameSaved = ref(false)

const store = usePokemonStore()

onMounted(async () => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
  const data = await res.json()
  pokemon.value = data

  // Load existing nickname if it exists
  if (store.edits[name]?.nickname) {
    nickname.value = store.edits[name].nickname
  }
})

function saveNickname() {
  store.editPokemon(name, { nickname: nickname.value })
  nicknameSaved.value = true
  setTimeout(() => (nicknameSaved.value = false), 2000)
}
</script>

<style scoped>
.container {
  background-color: #121212;
  border-radius: 12px;
}
.list-group-item {
  background-color: rgba(255, 255, 255, 0.05);
}
</style>
