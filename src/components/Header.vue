<script setup>
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { useBebidasStore } from '../stores/bebidas';

const route = useRoute();
// no usar destructuring, si no rompe la reactividad, como en los props
const store = useBebidasStore();

const paginaIncio = computed(() => route.name === 'inicio');

const handleSubmit = () => {
    // TO DO: Validar

    store.obtenerRecetas()
}
</script>

<template>
    
    <header
        class="bg-slate-800"
        :class="{header: paginaIncio}"
    >
        <div class="mx-auto container px-5 py-16">
            
            <div class="flex justify-between items-center">
                <!--Logo-->
                <div>
                    <RouterLink :to="{name: 'inicio'}">
                        <img class="w-32" src="/img/logo.svg" alt="Logotipo">
                    </RouterLink>
                </div>
                
                <!--Navegación-->
                <nav class="flex gap-4 text-white">
                     <RouterLink 
                     :to="{name: 'inicio'}"
                     class="uppercase font-bold"
                     active-class="text-orange-500"
                     >
                        Inicio
                     </RouterLink>

                      <RouterLink 
                     :to="{name: 'favoritos'}"
                     class="uppercase font-bold"
                      active-class="text-orange-500"
                     >
                        Favoritos
                     </RouterLink>
                </nav>
            </div>

            <!--Formulario busqueda-->
            <form
             class="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
             v-if="paginaIncio"
             @submit.prevent="handleSubmit"
             >
                <!-- Ingrediente -->
                <div class="space-y-4">
                    <label
                    class="block text-white uppercase font-extrabold text-lg"
                    for="ingrediente">Nombre o Ingredientes</label>

                    <input 
                        v-model="store.busqueda.nombre"
                        class="p-2 w-full rounded-lg focus:outline-none"
                        id="ingrediente"
                        type="text"
                        placeholder="Nombre o Ingrediente: ej. Vodka, Tequila, etc"
                    >
                </div>
                
                <!-- Categoria -->
                <div class="space-y-4">
                    <label
                    class="block text-white uppercase font-extrabold text-lg"
                    for="categoria">Categoría</label>

                    <select 
                    class="p-2 w-full rounded-lg focus:outline-none"
                    id="categoria"
                     v-model="store.busqueda.categoria"
                    >
                        <option value="">-- Seleccione --</option>
                        <option
                         v-for="categoria in store.categorias"
                         :key="categoria.strCategory"
                         :value="categoria.strCategory"
                        >{{categoria.strCategory}}</option>
                    </select>
                </div>

                <!-- Buscar Recetas Boton Submit -->
                <input 
                   
                    type="submit"
                    class="bg-orange-800 hover:bg-orange-900 cursor-pointer 
                    text-white font-extrabold w-full p-2 rounded-lg uppercase"
                    value="Buscar Recetas"
                >
            </form>
        </div>
    </header>
</template>

<style>
/* .text-orange-500 {
    color: rgb(249 115 22 / var(--tw-text-opacity)) !important;
} */

.header {
    background-image: url('/img/bg.jpg');
    background-position: center;
    background-size: cover;
}
</style>