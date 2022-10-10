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
        <MensagemSucessoVue @cadastro="novo" urlListagem="tipos-lista">
            <span> O id do Tipo cadastrado é: <strong> {{tipo.id}} </strong>. </span>
        </MensagemSucessoVue>
    </div>
</template>