<script>
import TreinadorDataService from '../services/TreinadorDataService';
import 'vue-loading-overlay/dist/vue-loading.css';
import Loading from "vue-loading-overlay";
import { useCookies } from 'vue3-cookies';
const { cookies } = useCookies();
export default {
    name: "treinadores-lista",
    data() {
        return {
            treinadores: [],
            treinadorSelecionado: this.inicializaTreinador(),
            isLoading: false,
        };
    },
    components: {
        Loading
    },
    methods: {
        buscarTreinadores() {
            TreinadorDataService.buscarTodos()
                .then(resposta => {
                    this.treinadores = resposta;
                })
                .catch(erro => {
                    console.log(erro);
                })
        },
        novo() {
            this.$router.push({ name: "treinadores-novo" });
        },
        trocar(treinador) {
            cookies.set('treinador_id', treinador.id, '10min')
            cookies.set('treinador_nome', treinador.nome, '10min')
        },
        removerTreinadorSelecionado() {
            TreinadorDataService.remover(this.treinadorSelecionado.id)
                .then(() => {
                    this.treinadores = this.treinadores.filter(treinador => treinador.id != this.treinadorSelecionado.id);
                    this.inicializaTreinador();
                })
                .catch(() => {
                    this.inicializaTreinador();
                });
        },
        inicializaTreinador() {
            return {
                "id": null,
                "nome": null
            }
        },
        selecionar(treinador) {
            this.treinadorSelecionado.id = treinador.id;
            this.treinadorSelecionado.nome = treinador.nome;
        },
    },
    mounted() {
        this.buscarTreinadores();
    }
}
</script>
<template>
    <div class="row">
        <h2 class="mb-4 mt-4 text-center">Lista de Treinadores:</h2>
        <loading v-model:active="isLoading" :is-full-page="fullPage" :loader="'dots'" />

        <div class="container-lg text-center row">
            <div class="col-md-auto" v-for="treinador in treinadores" :key="treinador.id">
                <div class="card mb-4" style="max-width: 530px;">
                    <h5 class="card-header text-center">
                        {{treinador.nome}}
                        <button class="btn" @click="trocar(treinador)"><svg xmlns="http://www.w3.org/2000/svg"
                                width="16" height="25" fill="blue" class="bi bi-arrow-right-square" viewBox="0 0 16 21">
                                <path fill-rule="evenodd"
                                    d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                            </svg></button>
                    </h5>
                    <div class="card-body">
                        <h5 class="card-title"> {{treinador.endereco.regiao}} - {{treinador.endereco.cidade}} </h5>
                        <div class="col">
                            <p class="card-text"> Nível: {{treinador.nivel}} </p>
                            <p class="card-text"> Dinheiro: {{treinador.dinheiro}} </p>
                        </div>
                        <div class="mt-2">
                            <button type="button" class="btn btn-outline-secondary" @click="editar(treinador.id)">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path
                                        d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                    <path fill-rule="evenodd"
                                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                </svg>
                            </button>

                            <button type="button" class="btn btn-outline-danger m-3" data-bs-toggle="modal"
                                data-bs-target="#confirmacaoExclusao" @click="selecionar(treinador)">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-trash3" viewBox="0 0 16 16">
                                    <path
                                        d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="confirmacaoExclusao" tabindex="-1" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">VOCÊ ESTÁ APAGANDO UM
                                TREINADOR!!</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            Você está apagando o treinador. Deseja continuar?
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-success" @click="removerTreinadorSelecionado"
                                data-bs-dismiss="modal">Continuar</button>
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>