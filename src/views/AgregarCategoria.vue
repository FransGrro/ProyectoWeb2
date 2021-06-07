<template>
  <div>
      <h1>Agregar Categoria</h1>
      <b-form @submit.prevent="guardarCategoria()">
      <Input
        v-model="categoria.cat_nombre"
        id="cat_nombre"
        titulo="Nombre"
        placeholder="Ingrese el nombre de la categoria"
        :maxlength="50"
        :error="erroresValidacion && !validacionNombre"
        mensajeError="Es necesario ingresar el nombre de la categoria"
        class="mb-2"
      />
      <b-button type="submit" class="mt-2" variant="primary">Guardar</b-button>
      </b-form>
      <notifications position = "bottom left" />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Input from "../components/Input";
export default {
    name: "AgregarCategoria",
    components: {
        Input,
    },
    data(){
        return{
            categoria:{
                cat_nombre:""
            },
            erroresValidacion: false
        }
    },
    computed: {
        validacionNombre(){
            return(
                this.categoria.cat_nombre !== undefined && this.categoria.cat_nombre.trim() !== ""
            )
        }
    },
    methods:{
        ...mapActions(["crearCategoria"]),
        guardarCategoria(){
            if(this.validacionNombre){
                this.crearCategoria({
                    params: this.categoria,
                    onComplete:(response) => {
                        console.log(response.data);
                        this.$notify({          
                            type: 'success', 
                            title: response.data.mensaje,
                        });
                        this.$router.push({
                            name: 'VerCategorias'
                        })
                    },
                    onError: (error) => {
                        console.log(error.response.data.mensaje);
                        this.$notify({
                            type: 'error', 
                            title: error.response.data.mensaje,
                        });
                    },
                });
            }else{
                this.erroresValidacion = true;
            }
        }
    }
}
</script>

<style>

</style>