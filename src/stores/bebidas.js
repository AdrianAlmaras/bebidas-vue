import { ref, reactive, onMounted } from "vue";
import { defineStore } from "pinia";
import APIService from "@/services/APIService";
import { useModalStore } from "./modal";


//* siempre inician con el nombre de use(NombreDelStore)Store, recibe 2 parámetros,
//* identificador(tiene que ser único) y el callback (podemos colocar dif funciones o acciones, getter computed properties, etc)

export const useBebidasStore = defineStore('bebidas', () => {
    const modal = useModalStore();

    // nuestras variables reacticas
    const categorias = ref([]);
    const busqueda = reactive({
        nombre: '',
        categoria: ''
    });
    const recetas = ref([]);
    const receta = ref({});

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

    // cuando se selecciona una bebida
    async function seleccionarBebida(id) {
        const {data: {drinks}} = await APIService.buscarReceta(id);
        console.log(drinks);

        receta.value = drinks[0];

        modal.handleClickModal();
    }

    return {
        categorias,
        busqueda,
        recetas,
        receta,
        obtenerRecetas,
        seleccionarBebida
    }
});