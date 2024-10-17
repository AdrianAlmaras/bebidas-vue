import { ref, reactive, onMounted } from "vue";
import { defineStore } from "pinia";
import APIService from "@/services/APIService";


//* siempre inician con el nombre de use(NombreDelStore)Store, recibe 2 parámetros,
//* identificador(tiene que ser único) y el callback (podemos colocar dif funciones o acciones, getter computed properties, etc)

export const useBebidasStore = defineStore('bebidas', () => {
    
    const categorias = ref([]);
    const busqueda = reactive({
        nombre: '',
        categoria: ''
    });
    const recetas = ref([]);

    onMounted(async () => {
        // como no sabemos cuanto tiempo se va tardar en responder la api, await espera, no ejecutes la sig linea de código
        const {data: {drinks}} = await APIService.obtenerCategorias();

        //console.log(drinks);
        categorias.value = drinks;
    });

    // si vas a crear una función que modifique el state, utiliza function
    async function obtenerRecetas() {
        const {data: {drinks}} = await APIService.buscarRecetas(busqueda);
        console.log('Recetas: ', drinks);
        recetas.value = drinks;
    }

    return {
        categorias,
        busqueda,
        obtenerRecetas,
    }
});