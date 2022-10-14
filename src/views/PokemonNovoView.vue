<script>
import PokemonDataService from '../services/PokemonDataService';
import AtaqueDataService from '../services/AtaqueDataService';
import TipoDataService from '../services/TipoDataService';
import PokemonRequest from '../models/PokemonRequest';
import MensagemSucessoVue from '../components/MensagemSucesso.vue';
export default {
    name: 'pokemons-novo',
    data() {
        return {
            pokemonRequest: new PokemonRequest(),
            tipos: [],
            ataques: [],
            salvo: false,
            generos: [
                {
                    indice: 1,
                    nome: "Masculino",
                    nomeBanco: "MASCULINO"
                },
                {
                    indice: 2,
                    nome: "Feminino",
                    nomeBanco: "FEMININO"
                },
                {
                    indice: 3,
                    nome: "Indefinido",
                    nomeBanco: "INDEFINIDO"
                }
            ],
            ataquesSelecionados: [],
            ataqueSelecionado: {}
        }
    },
    components: {
        MensagemSucessoVue
    },
    methods: {
        carregarTipos() {
            TipoDataService.buscarTodos()
                .then(resposta => {
                    this.tipos = resposta;
                })
                .catch(erro => {
                    console.log(erro);
                });
        },
        carregarAtaques() {
            AtaqueDataService.buscarTodos()
                .then(resposta => {
                    this.ataques = resposta;
                })
                .catch(erro => {
                    console.log(erro);
                })
        },
        removerAtaque(indice) {
            this.ataquesSelecionados.splice(indice, 1);
        },
        salvar() {
            const listaFiltrada = this.pokemonRequest.tiposIds.filter(tipo => tipo != "");
            this.pokemonRequest.tiposIds = [... new Set(listaFiltrada)]
            this.pokemonRequest.ataquesIds = this.pokemonRequest.ataquesIds.map(ataque => ataque.id);
            PokemonDataService.criar(this.pokemonRequest)
                .then(() => {
                    this.salvo = true;
                })
                .catch(erro => {
                    console.log(erro);
                    this.salvo = false;
                })
        },
        novo() {
            this.pokemonRequest = new PokemonRequest();
            this.salvo = false;
        },
        selecionarAtaque() {
            if (this.ataquesSelecionados.length < 4) {
                this.ataquesSelecionados.push(this.ataqueSelecionado);
                this.ataquesSelecionados =
                    [... new Set(this.ataquesSelecionados)];
            }
        }
    },
    mounted() {
        this.carregarTipos();
        this.carregarAtaques();
    }
}
</script>
<template>
    <div v-if="!salvo">
        <h4 class="mt-4 mb-4 text-center"> Cadastro de Pokémons:</h4>
        <div class="row justify-content-md-center" v-if="pokemonRequest.numeroPokedex > 0">
            <div class="col col-sm-2">
                <div class="card">
                    <img :alt="'Imagem do Pokemon' + pokemonRequest.nome" :title="pokemonRequest.nome" class="card-img"
                        :src="
                          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/' +
                          pokemonRequest.numeroPokedex +
                          '.png'
                        " />
                </div>
            </div>
        </div>
        <form>
            <div class="row">
                <div class="col-6 mb-3">
                    <label for="nome" class="form-label">Nome do Pokémon: </label>
                    <input v-model="pokemonRequest.nome" type="text" id="nome" required class="form-control">
                </div>
                <div class="col-6">
                    <label for="numero" class="form-label">Número da PokéDex: </label>
                    <input v-model="pokemonRequest.numeroPokedex" type="number" id="numero" required
                        class="form-control">
                </div>
            </div>
            <div class="row">
                <div class="col-2">
                    <label for="nivel" class="form-label text-center">Nível:</label>
                    <input v-model="pokemonRequest.nivel" type="number" id="nivel" required class="form-control">
                </div>
                <div class="col-2">
                    <label for="altura" class="form-label">Altura:</label>
                    <input v-model="pokemonRequest.altura" type="number" id="altura" required class="form-control">
                </div>
                <div class="col-2">
                    <label for="peso" class="form-label">Peso:</label>
                    <input v-model="pokemonRequest.peso" type="number" id="peso" required class="form-control">
                </div>
                <div class="col-2">
                    <label for="felicidade" class="form-label text-center">Felicidade:</label>
                    <input v-model="pokemonRequest.felicidade" type="number" id="felicidade" required
                        class="form-control">
                </div>
                <div class="col-4 mb-4">
                    <label for="genero" class="form-label">Gênero:</label>
                    <select id="genero" class="form-select" v-model="pokemonRequest.genero">
                        <option v-for="genero in  generos" :key="genero.indice" :value="genero.nomeBanco">
                            {{genero.nome}}
                        </option>
                    </select>
                </div>
            </div>
            <div class="col-12">
                <label for="tipo1" class="form-label">Tipo 1:</label>
                <select id="tipo1" class="form-select form-select-lg mb-3" aria-label=".form-select-lg example"
                    v-model="pokemonRequest.tiposIds[0]">
                    <option value="" selected>Nenhum</option>
                    <option v-for="tipo in tipos" :key="tipo.id" :value="tipo.id">
                        {{tipo.nome}}
                    </option>
                </select>
            </div>
            <div class="col-12">
                <label for="tipo2" class="form-label">Tipo 2:</label>
                <select id="tipo2" class="form-select form-select-lg mb-3" aria-label=".form-select-lg example"
                    v-model="pokemonRequest.tiposIds[1]">
                    <option value="" selected>Nenhum</option>
                    <option v-for="tipo in tipos" :key="tipo.id" :value="tipo.id">
                        {{tipo.nome}}
                    </option>
                </select>
            </div>
            <div class="col-12">
                <label for="ataque1" class="form-label">Ataque 1:</label>
                <select id="ataque1" class="form-select form-select-lg mb-3" aria-label=".form-select-lg example"
                    v-model="ataqueSelecionado" @change="selecionarAtaque">
                    <option v-for="ataque in ataques" :key="ataque.id" :value="ataque">
                        {{ataque.nome}} - Forca: {{ataque.forca}} - {{ataque.tipo.nome}} - {{ataque.categoria}}
                    </option>
                </select>
            </div>
            <div class="row">
                <div class="col-3 mb-3" v-for="(ataque, indice) in ataquesSelecionados" :key="ataque.id">
                    <div class="card h-100" style="min-width: 10rem">
                        <div class="card-header">
                            <div class="container">
                                <div class="row align-items-center">
                                    <div class="col-9">
                                        {{ataque.nome}}
                                    </div>
                                    <div class="col-3">
                                        <button class="btn" @click.prevent="removerAtaque(indice)">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                                                <path
                                                    d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <p class="card-text">Tipo: {{ataque.tipo.nome}}</p>
                            <p class="card-text">Forca: {{ataque.forca}}</p>
                            <p class="card-text">Acuracia: {{ataque.acuracia}}</p>
                            <p class="card-text">PP: {{ataque.pontosDePoder}}</p>
                            <p class="card-text">Categoria: {{ataque.categoria}}</p>
                            <p class="card-text">Descrição: {{ataque.descricao}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <button @click.prevent="salvar" class="btn btn-success text-center col-12 mb-2">Salvar</button>
        </form>
    </div>
    <div v-else>
        <div>
            <div class="alert alert-success mt-3" role="alert"><svg xmlns="http://www.w3.org/2000/svg" width="40"
                    height="40" fill="currentColor" class="bi bi-patch-check" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                    <path
                        d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z" />
                </svg>
                <MensagemSucessoVue @cadastro="novo" urlListagem="pokemon-lista">
                    O Pokémon <strong>{{pokemonRequest.nome}}</strong> foi salvo com sucesso!!
                </MensagemSucessoVue>
            </div>
        </div>
    </div>
</template>