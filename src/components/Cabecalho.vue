<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
    <header>
        <nav class="navbar navbar-dark navbar-expand-lg bg-dark">
            <div class="container-md">
                <img src='../../public/Poké_Ball_icon.svg.png' width="60" height="60" />
                <a class="navbar-brand" href="#">PokéDigix</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <RouterLink to="/" class="nav-link active" aria-current="page">Início</RouterLink>
                        </li>
                        <li class="nav-item">
                            <RouterLink to="/pokemons-selvagens" class="nav-link">Pokémons Selvagens</RouterLink>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                Ataques
                            </a>
                            <ul class="dropdown-menu">
                                <li>
                                    <RouterLink class="dropdown-item" to="/ataques/novo">Novo</RouterLink>
                                </li>
                                <li>
                                    <RouterLink class="dropdown-item" to="/ataques/lista">Lista</RouterLink>
                                </li>
                            </ul>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                Tipos
                            </a>
                            <ul class="dropdown-menu">
                                <li>
                                    <RouterLink class="dropdown-item" to="/tipos/novo">Novo</RouterLink>
                                </li>
                                <li>
                                    <RouterLink class="dropdown-item" to="/tipos/lista">Lista</RouterLink>
                                </li>
                            </ul>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                Pokémons
                            </a>
                            <ul class="dropdown-menu">
                                <li>
                                    <RouterLink class="dropdown-item" to="/pokemons/novo">Novo</RouterLink>
                                </li>
                                <li>
                                    <RouterLink class="dropdown-item" to="/pokemons/lista">Lista</RouterLink>
                                </li>
                            </ul>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                Treinadores
                            </a>
                            <ul class="dropdown-menu">
                                <li>
                                    <RouterLink class="dropdown-item" to="/treinador/novo">Novo</RouterLink>
                                </li>
                                <li>
                                    <RouterLink class="dropdown-item" to="/treinador/lista">Lista</RouterLink>
                                </li>
                            </ul>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                Ordenar
                            </a>
                            <ul class="dropdown-menu">
                                <li>
                                    <RouterLink class="dropdown-item" to="/treinador/novo">Novo</RouterLink>
                                </li>
                                <li>
                                    <RouterLink class="dropdown-item" to="/treinador/lista">Lista</RouterLink>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <form class="d-flex" role="search">
                        <input class="form-control me-1" type="search" placeholder="Pesquisar" aria-label="Search">
                        <button class="btn btn-success" type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="16"
                                height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                <path
                                    d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg></button>
                    </form>
                </div>
            </div>
        </nav>
    </header>
</template>