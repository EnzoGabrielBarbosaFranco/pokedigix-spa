<script>
import AtaqueDataService from '../services/AtaqueDataService';
import ModalExclusao from '../components/ModalExclusao.vue';
import Paginacao from '../components/Paginacao.vue';
import Ordenacao from '../components/Ordenacao.vue';
import Busca from '../components/Busca.vue';
import Loading from "vue-loading-overlay";
export default {
    name: "ataques-lista",
    data() {
        return {
            ataques: [],
            ataqueSelecionado: this.inicializarAtaque(),
            isLoading: false,
            fullPage: false,
            pagina: 1,
            quantidadeItensPorPagina: 3,
            totalPaginas: 4,
            quantidadeItens: 2,
            ordenacao: { titulo: "Nome A-Z", direcao: "ASC", campo: "nome" },
            termo: "",
            opcoes: [
                { titulo: "Nome A-Z", direcao: "ASC", campo: "nome" },
                { titulo: "Nome Z-A", direcao: "DESC", campo: "nome" },
            ]
        }
    },
    components: {
        Loading,
        ModalExclusao,
        Busca,
        Paginacao,
        Ordenacao
    },
    methods: {
        buscarAtaques() {
            this.isLoading = true;
            AtaqueDataService.buscarTodosPaginadoOrdenado(this.pagina-1, this.quantidadeItensPorPagina, this.ordenacao.campo, this.ordenacao.direcao, this.termo)
                .then(resposta => {
                    this.ataques = resposta.ataques;
                    this.totalPaginas = resposta.totalPaginas;
                    this.isLoading = false;
                })
                .catch(erro => {
                    console.log(erro);
                    this.isLoading = false;
                })
        },
        trocarPagina(p) {
            this.pagina = p;
            this.buscarAtaques();
        },
        editar(id) {
            this.$router.push({ name: 'ataques-editar', params: { id: id } });
        },
        inicializarAtaque() {
            return {
                id: null,
                nome: null
            }
        },
        removerAtaqueSelecionado() {
            this.isLoading = true;
            const id = this.ataqueSelecionado.id;
            AtaqueDataService.removerPorId(id)
                .then(resposta => {
                    this.ataques = this.ataques.filter(ataque => ataque.id != id);
                    this.isLoading = false;
                })
                .catch(erro => {
                    console.log(erro);
                    this.isLoading = false;
                });
            this.ataqueSelecionado = this.inicializarAtaque();
        },
        selecionar(ataque) {
            this.ataqueSelecionado.id = ataque.id;
            this.ataqueSelecionado.nome = ataque.nome;
        }
    },
    mounted() {
        this.buscarAtaques();
    }
}
</script>
        
<template>
    <h2 class=" mb-4 mt-4 text-center">Lista de Ataques:</h2>
    <div class="container-lg mt-4">
        <div class="row justify-content-end">
            <div class="col-2 mb-2">
                <Ordenacao v-model="ordenacao" :opcoes="opcoes" :ordenacao="ordenacao" @ordenar="buscarAtaques">
                </Ordenacao>
            </div>
            <div class="col-4">
                <form class="d-flex" role="search">
                    <input class="form-control me-2" v-model="termo" type="search" placeholder="Procurar"
                        aria-label="Search">
                    <button class="btn btn-success" type="button" @click.prevent="buscarPokemons"><svg
                            xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-search" viewBox="0 0 16 16">
                            <path
                                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg></button>
                </form>
            </div>
        </div>
        <div class="row table-responsive">
            <loading v-model:active="isLoading" :is-full-page="fullPage" :loader="'dots'" />

            <table class="table table-light">
                <thead class="table-light">
                    <tr class="text-center">
                        <th scope="col" class="text-center">id:</th>
                        <th scope="col" class="text-center">Nome do Ataque:</th>
                        <th scope="col" class="text-center">Tipo:</th>
                        <th scope="col" class="text-center">Categoria:</th>
                        <th scope="col" class="text-center">For??a:</th>
                        <th scope="col" class="text-center">Acur??cia:</th>
                        <th scope="col" class="text-center">Pontos de Poder:</th>
                        <th scope="col" class="text-center">Editar:</th>
                        <th scope="col" class="text-center">Excluir:</th>
                        <th class="col" colspan="2"> A????es </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="ataque in ataques" :key="ataque.id" class="text-center">
                        <td>{{ataque.id}}</td>
                        <td>{{ataque.nome}}</td>
                        <td>{{ataque.descricao}}</td>
                        <td>{{ataque.forca}}</td>
                        <td>{{ataque.acuracia}}</td>
                        <td>{{ataque.pontosDePoder}}</td>
                        <td>{{ataque.categoria}}</td>
                        <td>{{ataque.tipo.nome}}</td>
                        <td>
                            <button @click="editar(ataque.id)" class="btn btn-outline-dark">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                    <path
                                        d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                </svg>
                            </button>
                        </td>
                        <td>
                            <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal"
                                data-bs-target="#modalConfimacaoExclusao" @click="selecionar(ataque)">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-trash-fill" viewBox="0 0 16 16">
                                    <path
                                        d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                </svg>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <Paginacao :totalPaginas="totalPaginas" :quantidadeItens="quantidadeItens" :atual="pagina"
            :trocarPagina="trocarPagina"></Paginacao>
    </div>

    <ModalExclusao @remover="removerPokemonSelecionado">
        <p>  Voc?? est?? apagando o ataque "<strong> {{ataqueSelecionado.nome}} </strong>". Deseja continuar?
        </p>
    </ModalExclusao>
</template>