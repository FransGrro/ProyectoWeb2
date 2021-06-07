<template>
  <div>
    <h1>Cambiar Estatus</h1>
    <p>Ticket #{{ticket.tic_id}}</p>
    <p>Nombre: {{ticket.tic_nombre}}</p>
    <p>Descripción: {{ticket.tic_desc}}</p>
    <p>Prioridad: {{ticket.tic_prio}}</p>
    <b-form @submit.prevent="guardarTicket()">

    <br>

    <b-form-select v-model="ticket.tic_status" class="mb-3">
      <template #first>
        <b-form-select-option :value="null" disabled>-- Seleccione Estatus --</b-form-select-option>
      </template>
      <b-form-select-option value= "ABT">Abierto</b-form-select-option>
      <b-form-select-option value= "ESP">En espera</b-form-select-option>
      <b-form-select-option value= "FIN">Finalizado</b-form-select-option>
      </b-form-select>
      <br>

      <b-button type="submit" class="mt-2" variant="primary">Guardar</b-button>
    </b-form>
    
    <notifications position = "bottom left" />
  </div> 
</template>

<script>
import Vue from "vue"
import { mapActions, mapGetters, mapState } from "vuex";
import Input from "../components/Input";
export default {
  name: "CambiarEstatus",
  components: {
    Input,
  },
  data() {
    return {
      ticket: {
        tic_id:"",
        tic_nombre: "",
        tic_desc:"",
        tic_prio: "",
        tic_status: "",
      },
    };
  },
  computed: {


    validacionValidacion() {
      return (
        this.ticket.tic_status !== undefined
      );
    }
  },
  methods: {
    ...mapActions(["editarTicket","obtenerTicket"]),
    guardarTicket() {
      if (this.validacionValidacion ) {
        this.erroresValidacion = false;
        //Guardar
        this.editarTicket({
          id: this.$route.params.id,
          params: this.ticket,
          onComplete: (response) => {
            console.log(response.data);
            this.$notify({
              type: 'success', 
              title: response.data.mensaje,
            });
            this.$router.push({
                name: 'VerTickets'
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
    },
  },
  created(){

      this.obtenerTicket({
        id: this.$route.params.id,
        onComplete: (response) => {
            Vue.set(this, 'ticket', response.data.data)
        }
    })
  }
};
</script>

<style></style>