<template>
  <div>
    <h1>Editar empleado</h1>
    <b-form @submit.prevent="guardarPersona()">
        <p>Id : {{persona.per_id}}</p>
      <Input
        v-model="persona.per_nombre"
        id="per_nombre"
        titulo="Nombre"
        placeholder="Ingrese el nombre"
        :maxlength="50"
        :error="erroresValidacion && !validacionNombre"
        mensajeError="Es necesario ingresar el nombre"
        class="mb-2"
      />
      <Input
        v-model="persona.per_apellidos"
        id="per_apellido"
        titulo="Apellidos"
        placeholder="Ingrese los apellidos"
        :maxlength="80"
        :error="erroresValidacion && !validacionApellidos"
        mensajeError="Es necesario ingresar los apellidos"
        class="mb-2"
      />
      <Input
        v-model="persona.per_telefono"
        id="per_telefono"
        titulo="Telefono"
        :maxlength="10"
        :type="Number"
        :error="erroresValidacion && !validacionTelefono"
        mensajeError="Telefono de 10 digitos o tabla"
        placeholder="Ingrese el telefono"
        class="mb-2"
      />
      <Input
        v-model="persona.per_direccion"
        id="per_direccion"
        titulo="Dirección"
        :maxlength="150"
        placeholder="Ingrese la dirección"
      />
      <b-button type="submit" class="mt-2" variant="primary">Guardar</b-button>
    </b-form>
    <notifications position = "bottom left" />
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions, mapState } from 'vuex'
import Input from "../components/Input";
export default {
name: 'EditarPersona',
components: {
    Input,
  },
  data() {
    return {
      persona: {
        per_id:"",
        per_nombre: "",
        per_apellidos:"",
        per_direccion: "",
        per_telefono: "",
      },
      erroresValidacion: false,
    };
  },
computed: {
    validacionNombre() {
      return (
        this.persona.per_nombre !== undefined && this.persona.per_nombre.trim() !== ""
      );
    },
    validacionApellidos() {
      return (
        this.persona.per_apellidos !== undefined && this.persona.per_apellidos.trim() !== ""
      );
    },
    validacionTelefono() {
      return (
        this.persona.per_telefono == undefined || this.persona.per_telefono.trim() == "" || this.persona.per_telefono.length == 10
      );
    }
},
methods: {
    ...mapActions(['obtenerPersona', 'editarPersona']),
    guardarPersona() {
      if (this.validacionNombre && this.validacionApellidos && this.validacionTelefono) {
        this.erroresValidacion = false;
        //Guardar
         this.editarPersona({
          id: this.$route.params.id,
          params: this.persona,
          onComplete: (response) => {
           
           console.log(response.data);
            this.$notify({
              type: 'success', 
              title: response.data.mensaje,
            });
            this.$router.push({
                name: 'VerPersonal'
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
      } else {
        this.erroresValidacion = true;
      }
    }
},
created() {
    this.obtenerPersona({
        id: this.$route.params.id,
        onComplete: (response) => {
            Vue.set(this, 'persona', response.data.data)
        }
    })
}
}
</script>

<style>
</style>