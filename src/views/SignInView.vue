<script>
import TipoDataService from '../services/TipoDataService';
import Tipo from '../models/Tipo'
import MensagemSucessoVue from '../components/MensagemSucesso.vue';
export default {
    name: 'logins-novo',
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
    <div class="container mt-3">
        <div class="d-flex justify-content-center h-100">
            <div class="card mt-3 rounded-4">
                <div class="card-header">
                    <h3 class="text-center">Entrar</h3>
                </div>
                <div class="card-body">
                    <form>
                        <div class="input-group form-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text p-2 rounded-3"><svg xmlns="http://www.w3.org/2000/svg"
                                        width="22" height="22" fill="currentColor" class="bi bi-person"
                                        viewBox="0 0 16 16">
                                        <path
                                            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                                    </svg><i class="fas fa-user"></i></span>
                            </div>
                            <input type="text" class="form-control p-1 rounded-2" placeholder="Nome de Usuário ou E-mail">
                        </div>
                        <div class="input-group form-group mb-2">
                            <div class="input-group-prepend">
                                <span class="input-group-text p-2 rounded-3"><svg xmlns="http://www.w3.org/2000/svg"
                                        width="22" height="22" fill="currentColor" class="bi bi-key"
                                        viewBox="0 0 16 16">
                                        <path
                                            d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8zm4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5z" />
                                        <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                                    </svg><i class="fas fa-key"></i></span>
                            </div>
                            <input type="password" class="form-control p-1 rounded-2" placeholder="Senha">
                        </div>


                        <div class="row">
                            
                            <input type="submit" value="Entrar" class="btn btn-success rounded-4 mt-1">
                            <div class="row justify-content-center">
                                <div class="form-check mt-2">
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                                    <label class="form-check-label" for="flexCheckDefault">
                                        Lembrar Usuário
                                    </label>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="card-footer">
                    <div class="d-flex justify-content-center links">
                        Não possui conta?<RouterLink to="/usuarios/novo"><a href="#">Cadastre-se</a></RouterLink>
                    </div>
                    <div class="d-flex justify-content-center mt-2">
					<a href="#">Esqueceu sua senha?</a>
				</div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
.card {
    margin-top: auto;
    margin-bottom: auto;
    width: 400px;
}
</style>