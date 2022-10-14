<script>
import TipoDataService from '../services/TipoDataService';
import Tipo from '../models/Tipo'
import MensagemSucessoVue from '../components/MensagemSucesso.vue';
export default {
    name: 'tipos-novo',
    data() {
        return {
            tipo: new Tipo(),
            salvo: false
        }
    },
    components: {
        MensagemSucessoVue
    },
    methods: {
        salvar() {
            TipoDataService.criar(this.tipo)
                .then(resposta => {
                    this.tipo.id = resposta.id;
                    console.log(this.tipo);
                    this.salvo = true;
                })
                .catch(erro => {
                    console.log(erro);
                    this.salvo = false;
                })
        },

        novo() {
            this.tipo = new Tipo();
            this.salvo = false;
        },
        voltar() {
            this.$router.push({ name: "tipos-lista" });
        },
    },
}
</script>
<template>
    <div v-if="!salvo">
        <h4 class="mt-4 mb-2 text-center"> Cadastro de Tipos:</h4>
        <form>
            <div class="mb-4">
                <label for="nome" class="form-label">Nome do Tipo:</label>
                <input type="text" required class="form-control" v-model="tipo.nome" id="nome">
            </div>
            <button @click.prevent="salvar" class="btn btn-success col-12 mb-2">Salvar</button>
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
                <MensagemSucessoVue @cadastro="novo" urlListagem="tipos-lista">
                    <span>O Tipo <strong>{{tipo.nome}}</strong> foi salvo com sucesso!</span>
                </MensagemSucessoVue>
            </div>
        </div>
    </div>
</template>