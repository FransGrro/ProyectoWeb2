<template>
  <div>
    <h1>Agregar Ticket</h1>
    <b-form @submit.prevent="guardarTicket()">
      <Input
        v-model="ticket.tic_nombre"
        id="tic_nombre"
        titulo="Nombre"
        placeholder="Ingrese el nombre"
        :maxlength="50"
        :error="erroresValidacion && !validacionNombre"
        mensajeError="Es necesario ingresar el nombre"
        class="mb-2"
      />
      <Input
        v-model="ticket.tic_desc"
        id="tic_desc"
        titulo="Descripcion"
        placeholder="Ingrese la descripcion"
        :maxlength="100"
        class="mb-2"
      />
      <b-form-group label="Prioridad" v-slot="{ ariaDescribedby }"> 
      <b-form-radio-group
        v-model="ticket.tic_prio"
        :options="prioridades"
        :aria-describedby="ariaDescribedby"
        name="radio-prioridad"
      ></b-form-radio-group>
    </b-form-group>

    <b-form-select v-model="ticket.per_id" class="mb-3">
      <template #first>
        <b-form-select-option :value="null" disabled>-- Seleccione un empleado --</b-form-select-option>
      </template>
      <b-form-select-option v-for="p in personal" :key="p.per_id" :value="p.per_id">{{p.per_nombre}} {{p.per_apellidos}}</b-form-select-option>
      </b-form-select>
      <br>

    <b-form-select v-model="ticket.cat_id" class="mb-3">
      <template #first>
        <b-form-select-option :value="null" disabled>-- Seleccione una categoria --</b-form-select-option>
      </template>
      <b-form-select-option v-for="c in categorias" :key="c.cat_id" :value="c.cat_id">{{c.cat_nombre}}</b-form-select-option>
      </b-form-select>
      <br>

      <b-button type="submit" class="mt-2" variant="primary">Guardar</b-button>
    </b-form>
    
    <notifications position = "bottom left" />
  </div> 
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import Input from "../components/Input";
export default {
  name: "AgregarTicket",
  components: {
    Input,
  },
  data() {
    return {
      ticket: {
        tic_nombre: "",
        tic_desc:"",
        tic_prio: "2",
        per_id: "",
        cat_id: "",
        tic_status: "ABT",
       
      },
      prioridades:[
          { text: 'Baja', value: '1' },
          { text: 'Media', value: '2' },
          { text: 'Alta', value: '3' }
      ],
      erroresValidacion: false,
    };
  },
  computed: {
      ...mapState(["categorias","personal"]),
      //...mapGetters(["opcionesPersonal"]),
    validacionNombre() {
      return (
        this.ticket.tic_nombre !== undefined && this.ticket.tic_nombre.trim() !== ""
      );
    },
    validacionEmpleado() {
      return (
        this.ticket.per_id !== undefined
      );
    },
    validacionCategoria() {
      return (
        this.ticket.cat_id !== undefined
      );
    }
  },
  methods: {
    ...mapActions(["crearTicket","setCategorias","setPersonal"]),
    guardarTicket() {
      if (this.validacionNombre && this.validacionEmpleado && this.validacionCategoria ) {
        this.erroresValidacion = false;
        //Guardar
        this.crearTicket({
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
      this.setPersonal(),
      this.setCategorias()
  }
};
</script>

<style></style>