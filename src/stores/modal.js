import {  ref  } from 'vue';
import {  defineStore  } from 'pinia';

export const useModalStore = defineStore('modal', () =>{
    const modal = ref(false);

    // las funciones que cambien el state se les conoce como acciones
    function handleClickModal() {
        modal.value = !modal.value;
    }

    return {
        handleClickModal,
        modal
    }
});


