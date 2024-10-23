<script setup>
import { useFavoritosStore } from '@/stores/favoritos';
import Receta from '@/components/Receta.vue';

const favoritosStore = useFavoritosStore()



</script>

<template>
    <div>
        <h1 class="text-6xl font-extrabold">
            Favoritos
        </h1>

        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-10 my-10 gap-12">
            <Receta
                v-for="receta in favoritosStore.favoritos"
                :receta="receta"
                :key="receta.idDrink"
            />
        </div>
    </div>
</template>

