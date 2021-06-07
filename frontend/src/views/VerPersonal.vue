<template>
  <div>
      <h1>Personal</h1>
    <b-button variant="primary" to="/agregarPersona">Agregar empleado</b-button>
    <Table :items="personal" :fields="campos">
        <template slot="actions" slot-scope="{ item }">
            <b-button class="me-1" @click="onEditar(item)">Editar</b-button>
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
    name: "VerPersonal",
    components:{
        Table
    },
    data(){
        return{
            campos:[
                {key:"per_id", label: "Id"},
                {key: "per_nombre", label: "Nombre"},
                {key: "per_apellidos", label: "Apellido"},
                {
                    key: "per_telefono",
                    label: "Telefono",
                    formatter: (value) => {
                    return value || "Sin datos";
                    }
                },
                {
                    key: "per_direccion",
                    label: "Dirección",
                    formatter: (value) => {
                    return value || "Sin datos";
                    }
                },
                { key: "actions", label: "Acciones" }
            ]
        }
    },
    methods:{
        ...mapActions(["setPersonal","eliminarPersona"]),
        onEditar(item) {
        console.log("Editar", item.item.per_id);
        this.$router.push({
            name: "EditarPersona",     
            params: {
                id: item.item.per_id,
            },
        });
        },
    onEliminar(item) {
      console.log("Eliminar", item.item.per_id);
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
            this.eliminarPersona({
              id: item.item.per_id,
              onComplete: (response) => {
                this.$notify({
                  type: "success",
                  title: response.data.mensaje,
                });
                setTimeout(() => this.setPersonal(), 1000);
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
        ...mapState(["personal"])
    },
    created(){
        this.setPersonal();
    }
}
</script>

<style>

</style>