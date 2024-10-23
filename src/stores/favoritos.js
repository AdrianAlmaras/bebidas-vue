import { ref, watch, onMounted } from "vue";
import { defineStore } from "pinia";
import {  useBebidasStore  } from "./bebidas.js"

export const useFavoritosStore = defineStore('favoritos', () => {
    const bebidasStore = useBebidasStore();
    const favoritos = ref([]);

    onMounted(() => {
        favoritos.value = JSON.parse(localStorage.getItem('favoritos')) ?? []
    });

    watch(favoritos, () => {
        sincronizarLocalStorage();
    }, {
        deep: true
    });

    const sincronizarLocalStorage = () => {
        localStorage.setItem('favoritos', JSON.stringify(favoritos.value));
    };

    const handleClickFavorito = () => {
        //console.log(bebidasStore.receta);
        favoritos.value.push(bebidasStore.receta);
        console.log(bebidasStore.receta);
    };


    return {
        favoritos,
        handleClickFavorito,
    }
});


