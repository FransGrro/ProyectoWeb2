<template>
  <div class="home">
      <section id = "filtroHome">
        <b-button class="me-1" @click="elegirCategoria">Elegir</b-button>
      <b-form-select v-model="cat_id" class="mb-3">
      <template #first>
        <b-form-select-option :value="null" disabled>-- Seleccione una categoria --</b-form-select-option>
      </template>
      <b-form-select-option v-for="c in categorias" :key="c.cat_id" :value="c.cat_id">{{c.cat_nombre}}</b-form-select-option>
      </b-form-select>
      </section>
      <section id = "mostradorTarjetas">
        <Tarjeta
        v-for = "t in ticketsFiltrados"
        :key = "t.tic_id"
        :ticket = "t"
        />
      </section>
      
  </div>
</template>

<script>
// @ is an alias to /src
import Tarjeta from "../components/Tarjeta";
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name: 'Home',
  components: {
    Tarjeta
  },
  data(){
    return{
      cat_id : ""
    }
  },
  methods: {
    ...mapActions(["setTickets","setCategorias","setCatElegida"]),
    elegirCategoria(){
      console.log(this.cat_id)
      this.setCatElegida(this.cat_id);
    }
  },
  computed:{
    ...mapState(["categorias"]),
    ...mapGetters(["ticketsFiltrados"])
  },
  created() {
    this.setTickets();
    this.setCategorias();
  },
}
</script>

<style>
  #mostradorTarjetas{
    width: 100%;
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
  }
</style>
