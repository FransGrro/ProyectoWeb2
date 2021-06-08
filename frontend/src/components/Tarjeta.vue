<template>
    <div id="mein" :class="ticket.tic_status">
        <div id = "arriba" :class="ticket.tic_status">
            <h3>#{{ticket.tic_id}}</h3>
            <p>{{ticket.tic_nombre}}</p>
        </div>
        <p id = "medio">{{ticket.tic_desc}}</p>
        <div id="abajo">
            <p>{{ticket.tic_prio}}</p>
            <p>{{ticket.tic_status}}</p>
        </div>
    </div>
</template>

<script>

export default{
    name: 'Tarjeta',
    props:{
        ticket: {
            tic_id:"",
            tic_nombre: "",
            tic_desc:"",
            tic_prio: "",
            per_id: "",
            cat_id: "",
            tic_status: "",
      }
    }
}
</script>

<style>
    #mein{
        width: 300px;
        height: 150px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        background-color: white;
        margin: 10px;
    }

    #arriba{
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        align-content: center;
    }

    .ABT{
        background-color: red;
        color: white;
        border: 1px red;
        border-style: solid;
        border-radius: 5px;
    }

    .ESP{
        background-color: green;
        color: white;
        border: 1px green;
        border-style: solid;
        border-radius: 5px;
    }

    .FIN{
        background-color: rgb(58, 58, 58);
        color: white;
        border: 1px rgb(58, 58, 58);
        border-style: solid;
        border-radius: 5px;
    }

    #abajo{
        display: flex;
        justify-content: space-evenly;
    }

    #medio{
        color: black;
    }

    #abajo{
        color: black;
    }


</style>
