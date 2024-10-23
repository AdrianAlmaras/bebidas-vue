<script setup>
import { Dialog, DialogPanel, DialogTitle, 
    TransitionChild, TransitionRoot } from '@headlessui/vue';

import {  useModalStore  } from '../stores/modal';
import { useBebidasStore } from '@/stores/bebidas';
import { useFavoritosStore } from '@/stores/favoritos';

const modalStore = useModalStore();
const bebidasStore = useBebidasStore();
const favoritosStore = useFavoritosStore();

 
const formatearIngredientes = () =>{
  const ingredienteDiv = document.createElement('DIV');
  //console.log(ingredienteDiv, "DIV");

  for (let i = 1; i <= 15; i++) {
    if (bebidasStore.receta[`strIngredient${i}`]) {
      const ingrediente = bebidasStore.receta[`strIngredient${i}`];
      //console.log(ingrediente, "INGREDIENTE");
      const cantidad = bebidasStore.receta[`strMeasure${i}`];
      //console.log(cantidad, "cantidades");

      const ingredienteCantidad = document.createElement('P');
      ingredienteCantidad.classList.add('text-lg', 'text-gray-500');
      ingredienteCantidad.textContent = `${ingrediente} - ${cantidad}`;

      ingredienteDiv.appendChild(ingredienteCantidad);
    };
  };

  return ingredienteDiv
};
</script>

<template>

    <TransitionRoot as="template" :show="modalStore.modal" >
      <Dialog as="div" class="relative z-10" @close="modalStore.handleClickModal()">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div class="fixed inset-0 z-10 overflow-y-auto">
          
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              
              <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6" >
              
                <div>
                  
                  <div class="mt-3">
                    <!--Titulo-->
                    <DialogTitle as="h3" class="text-gray-900 text-4xl font-extrabold my-5">
                        {{ bebidasStore.receta.strDrink }}
                    </DialogTitle>

                    <!--Imagen-->
                    <img
                      class="img-modal mx-auto w-80 my-2"
                      :src="bebidasStore.receta.strDrinkThumb" 
                      :alt="'Imagen de ' + bebidasStore.receta.strDrink"
                    >

                    <!--Ingredientes-->
                    <DialogTitle as="h3" class="text-gray-900 text-4xl font-extrabold my-5">
                        Ingredientes y Cantidades
                    </DialogTitle>

                    <!--
                      Utilizar v-html cuando los datos sean seguros, 
                      ejem no usar en un formulario ya que podria ingresar codigo malicioso.
                      En este caso como proviene de una api, es decir todo fue sanatizado antes de entrar a la bd, es seguro.

                      Si creas un proyecto, sanitizas la información o utilizas un ORM, se guarda en 
                      la bd, y si lo quieres sacar de la base de datos y renderizarlo, puedes utilizar
                      html sin nin gun problema.
                    -->
                    <div v-html="formatearIngredientes().outerHTML"></div>
                    <!--Ingredientes FIN -->

                    <!-- Instrucciones -->
                    <DialogTitle as="h3" class="text-gray-900 text-4xl font-extrabold my-5">
                        Instrucciones
                    </DialogTitle>

                    <p class="text-lg text-gray-500">
                      {{ bebidasStore.receta.strInstructions }}
                    </p>
                  </div>

                </div>
                
                <!--  Botton de cerrar  -->
                <div class="mt-5 sm:mt-6 flex justify-between gap-4">
                    <button
                        type="button"
                        class="w-full rounded bg-gray-600 p-2 font-bold uppercase text-white shadow 
                        hover:bg-gray-500"
                        @click="modalStore.handleClickModal()"
                    >
                        Cerrar
                    </button>

                    <button
                      type="button"
                       class="w-full rounded bg-orange-600 p-2 font-bold uppercase text-white shadow 
                        hover:bg-orange-500"
                      @click="favoritosStore.handleClickFavorito()"
                    >
                      Agregar a Favoritos
                    </button>
                    
                </div> 
              
              </DialogPanel>

            </TransitionChild>

          </div>

        </div>

      </Dialog>
    </TransitionRoot>

</template>

<style>
/* .img-modal {
  height: 25rem;
} */
</style>