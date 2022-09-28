<script>
import TheWelcome from '../components/TheWelcome.vue'
import PokemonDataService from '../services/PokemonDataService';
export default {
  name: "lista-de-pokemons",
  data() {
    return { pokemons: [] }

  },
  methods: {
    buscarPokemons() {
      this.pokemons = PokemonDataService.buscarTodos()
        .then(resposta => {
          this.pokemons = resposta
        })
        .catch(erro => {
          console.log(erro);
        })
    }
  },
  mounted() {
    this.buscarPokemons();
  }
}
</script>

<template>
    <div class="row row-cols-1 row-cols-md-5 g-3">
      <div class="col" v-for="pokemon in pokemons" :key="pokemon.id">
        <div class="card">
          <img
            :src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + pokemon.numeroPokedex + '.png'"
            class="card-img-top" alt="..." />
            <div class="card w-100">
          <div class="card-body" style="width: 18rem">
            <h5 class="card-title">N°: {{pokemon.numeroPokedex}} </h5>
            <h5 class="card-title"> Nome: {{pokemon.nome}} </h5>
            <h5 class="text-blue">Nível: {{pokemon.nivel}} </h5>
            <p class="card-text"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<style>
#card {
  width: 1000rem;
}
</style>
