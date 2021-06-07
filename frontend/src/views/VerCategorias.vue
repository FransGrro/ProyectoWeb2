<template>
    <div>
        <h1>Categorias</h1>
        <b-button variant="primary" to="/agregarCategoria">Agregar categoria</b-button>
        <Table :items="categorias" :fields="campos">
            <template slot="actions" slot-scope="{ item }">
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
    name: "VerCategorias",
    components:{
        Table
    },
    data(){
        return{
            campos:[
                {key:"cat_id", label: "Id"},
                {key: "cat_nombre", label: "Nombre"},
                { key: "actions", label: "Acciones" },
            ]
        }
    },
    methods:{
        ...mapActions(["setCategorias","eliminarCategoria"]),
        onEliminar(item) {
            console.log("Eliminar", item.item.cat_id);
            this.$bvModal
            .msgBoxConfirm("Esta opción no se puede deshacer.", {
                title: "Eliminar Categoria",
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
                    this.eliminarCategoria({
                        id: item.item.cat_id,
                        onComplete: (response) => {
                            this.$notify({
                                type: "success",
                                title: response.data.mensaje,
                            });
                            setTimeout(() => this.setCategorias(), 1000);
                        },
                    });
                }
            })
            .catch((err) => {
                // An error occurred
            });
        }
    },
    computed:{
        ...mapState(["categorias"])
    },
    created(){
        this.setCategorias();
    }
}
</script>

<style>

</style>