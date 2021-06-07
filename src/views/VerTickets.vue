<template>
  <div>
      <h1>Tickets</h1>
    <b-button variant="primary" to="/agregarTicket">Agregar ticket</b-button>
    <Table :items="tickets" :fields="campos">
        <template slot="actions" slot-scope="{ item }">
            <b-button class="me-1" @click="onEditar(item)">Editar</b-button>
            <b-button class="me-1" @click="onCambiarEstatus(item)">Cambiar Estatus</b-button>
            <b-button @click="onEliminar(item)">Eliminar</b-button>
        </template>   
    </Table>
    <notifications position = "bottom left" />  
  </div>
</template>

<script>
import Table from "../components/Table";
import { mapState, mapActions } from "vuex";
export default {
    name: "VerTickets",
    components:{
        Table
    },
    data(){
        return{
            campos:[
                {key:"tic_id", label: "Id"},
                {key: "tic_nombre", label: "Nombre"},
                {
                    key: "tic_desc", 
                    label: "Descripción",
                    formatter: (value) => {
                    return value || "Sin datos";
                    }
                },
                {key: "tic_prio",label: "Prioridad"},
                {key: "per_nombre", label: "Empleado"},
                {key: "cat_nombre", label: "Categoria"},
                {key: "tic_status", label: "Status"},
                { key: "actions", label: "Acciones" }
            ]
        }
    },
    methods:{
        ...mapActions(["setTickets","eliminarTicket"]),
        onEditar(item) {
        console.log("Editar", item.item.tic_id);
        this.$router.push({
            name: "EditarTicket",     
            params: {
                id: item.item.tic_id,
            },
        });
        },
        onCambiarEstatus(item) {
        console.log("Estatus", item.item.tic_id);
        this.$router.push({
            name: "CambiarEstatus",     
            params: {
                id: item.item.tic_id,
            },
        });
        },
    onEliminar(item) {
      console.log("Eliminar", item.item.tic_id);
      this.$bvModal
        .msgBoxConfirm("Esta opción no se puede deshacer.", {
          title: "Eliminar empleado",
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "Aceptar",
          cancelTitle: "Cancelar",
          footerClass: "p-2",
          centered: true,
        })
        .then((value) => {
          if (value) {
            this.eliminarTicket({
              id: item.item.tic_id,
              onComplete: (response) => {
                this.$notify({
                  type: "success",
                  title: response.data.mensaje,
                });
                setTimeout(() => this.setTickets(), 1000);
              },
            });
          }
        })
        .catch((err) => {
          console.log(err)
        });
    },
    },
    computed:{
        ...mapState(["tickets"])
    },
    created(){
        this.setTickets();
        console.log(this.tickets)
    }
}
</script>

<style>

</style>