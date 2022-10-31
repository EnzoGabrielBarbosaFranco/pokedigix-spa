export default class Treinador {
    constructor() {
        this.idEndereco = null;
        this.nome = null;
        this.idPrimeiroPokemon = null;
        this.dinheiro = null;
        this.nivel = null;
    }

    populate(obj) {
        this.idEndereco = obj.idEndereco;
        this.nome = obj.nome;
        this.idPrimeiroPokemon = obj.idPrimeiroPokemon;
        this.dinheiro = obj.dinheiro;
        this.nivel = obj.nivel;
    }

    toJson() {
        return {
            idEndereco: this.idEndereco,
            nome: this.nome,
            idPrimeiroPokemon: this.idPrimeiroPokemon,
            dinheiro: this.dinheiro,
            nivel: this.nivel
        }
    }
}