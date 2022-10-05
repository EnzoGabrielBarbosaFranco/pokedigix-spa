<script>
import AtaqueDataService from '../services/AtaqueDataService';
import Loading from "vue-loading-overlay";
export default {
    name: "ataques-lista",
    data() {
        return { 
            ataques: [],
            ataqueSelecionado: this.inicializaAtaque(),
            isLoading: false,
            fullPage: false,
        };
    },
    components: {
        Loading,
    },
    methods: {
        buscarAtaques() {
            this.isLoading = true;
            AtaqueDataService.buscarTodos()
                .then((resposta) => {
                    this.ataques = resposta;
                    this.isLoading = false
                })
                .catch(erro => {
                    console.log(erro);
                    this.isLoading = false
                });
        },
        editar(id) {
            this.$router.push({ name: 'ataques-edit', params: { id: id } });
        },
        selecionar(ataque) {
            this.ataqueSelecionado.id = ataque.id
            this.ataqueSelecionado.nome = ataque.nome
        },
        inicializaAtaque() {
            return {
                id: null,
                nome: null
            }
        },
        removerAtaqueSelecionado() {
            this.isLoading = true;
            AtaqueDataService.remover(this.ataqueSelecionado.id)
            .then(() =>{
                this.ataques = this.ataques.filter(ataque => ataque.id != this.ataqueSelecionado.id);
                this.inicializaAtaque();
                this.isLoading = false;
            })
            .catch(() => {
                this.inicializaAtaque();
                this.isLoading = false;
            });
        }
    },
    mounted() {
        this.buscarAtaques();
    },
};
</script>  
<template>
    <main>
        <div class="row">
            <h2 class=" mb-4 mt-4 text-center">Lista de Ataques:</h2>
            <div class="table-responsive">
                <loading
                v-model:active="isLoading"
                :is-full-page="fullPage"
                :loader="'dots'"/>
                <table class="table table-light">
                    <thead>
                        <tr>
                            <th scope="col" class="text-center">id:</th>
                            <th scope="col" class="text-center">Nome do Ataque:</th>
                            <th scope="col" class="text-center">Tipo:</th>
                            <th scope="col" class="text-center">Categoria:</th>
                            <th scope="col" class="text-center">Força:</th>
                            <th scope="col" class="text-center">Acurácia:</th>
                            <th scope="col" class="text-center">Pontos de Poder:</th>
                            <th scope="col" class="text-center">Editar:</th>
                            <th scope="col" class="text-center">Excluir:</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="ataque in ataques" :key="ataque.id">
                            <th scope="row" class="text-center">{{ataque.id}}</th>
                            <td id="nomeDoAtaque" class="text-center">{{ataque.nome}}</td>
                            <td class="text-center">{{ataque.tipo.nome}}</td>
                            <td class="text-center">{{ataque.categoria}}</td>
                            <td class="text-center">{{ataque.forca}}</td>
                            <td class="text-center">{{ataque.acuracia}}</td>
                            <td class="text-center">{{ataque.pontosDePoder}}</td>
                            <td class="text-center">
                                <button id="btn-editar" type="button" class="btn btn-outline-secondary"
                                    @click="editar(ataque.id)"> <svg xmlns="http://www.w3.org/2000/svg" width="16"
                                        height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path
                                            d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                        <path fill-rule="evenodd"
                                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                    </svg> </button>
                            </td>
                            <td class="text-center">
                                <button type="button" @click="selecionar(ataque)" class="btn btn-outline-danger"
                                    data-bs-toggle="modal" data-bs-target="#confirmacaoExclusao" 
                                    data-bs-whatever="@mdo"><svg xmlns="http://www.w3.org/2000/svg" width="16"
                                        height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                        <path
                                            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                        <path fill-rule="evenodd"
                                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                    </svg></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="modal fade" id="confirmacaoExclusao" tabindex="-1" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">VOCÊ ESTÁ APAGANDO UM
                            ATAQUE!!</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Você está apagando o ataque "<strong> {{ataqueSelecionado.nome}} </strong>". Deseja continuar?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-success" @click="removerAtaqueSelecionado"
                            data-bs-dismiss="modal">Continuar</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>