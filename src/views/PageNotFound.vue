<template>
    <div class="container text-center mt-4">
        <RouterLink to="/"> <img src="../images/pyduck.webp" alt=""> </RouterLink>
    </div>
    <h2 class="mt-5 text-center">Página não encontrada. Erro 404!!!!</h2>
    <h4 class="mt-4 text-center">Volte a página inicial ou clique no Psyduck acima.</h4>
    <div class="text-center mt-4">
       <RouterLink to="/"><button type="button" class="btn btn-lg btn-primary" data-bs-dismiss="modal">Início</button></RouterLink>
    </div>
</template>

<script setup>
import {RouterLink} from 'vue-router';
</script>