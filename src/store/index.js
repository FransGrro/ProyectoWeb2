import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categorias:[],
    personal:[],
    persona:{},
    tickets: [],
    ticket: {}

  },
  mutations: {
    SET_CATEGORIAS(state, categorias) {
      state.categorias = categorias;
    },
    SET_PERSONAL(state, personal) {
      state.personal = personal;
    },
    SET_PERSONA(state,persona){
      state.persona = persona;
    },
    SET_TICKETS(state, tickets){
      state.tickets = tickets;
    },
    SET_TICKET(state, ticket){
      state.ticket = ticket;
    }
  },
  actions: {
    setCategorias({commit}){
      axios.get('http://localhost:3000/categorias/')
      .then( response => {
        commit('SET_CATEGORIAS', response.data);
      })
    },
    eliminarCategoria({commit}, {id, onComplete, onError}){
      axios.delete(`http://localhost:3000/categorias/${id}`)
      .then(onComplete)
      .catch(onError)
    },
    crearCategoria({commit}, {params, onComplete, onError}) {
      axios.post('http://localhost:3000/categorias', params)
      .then(onComplete)
      .catch(onError)
    },

    crearPersona({commit}, {params, onComplete, onError}) {
      axios.post('http://localhost:3000/personal', params)
      .then(onComplete)
      .catch(onError)
    },
    setPersonal({commit}){
      axios.get('http://localhost:3000/personal')
      .then( response => {
        commit('SET_PERSONAL', response.data);
      })
    },
    obtenerPersona({commit}, {id, onComplete, onError}) {
      axios.get(`http://localhost:3000/personal/${id}`)
      .then( response => {
        commit('SET_PERSONA', response.data.data);
        onComplete(response)
      })
      .catch(onError)
    },
    editarPersona({commit}, {id, params, onComplete, onError} ) {
      axios.put(`http://localhost:3000/personal/${id}`, params)
      .then(onComplete)
      .catch(onError)
    },
    eliminarPersona({commit}, {id, onComplete, onError}){
      axios.delete(`http://localhost:3000/personal/${id}`)
      .then(onComplete)
      .catch(onError)
    },
    crearTicket({commit}, {params, onComplete, onError}) {
      axios.post('http://localhost:3000/tickets', params)
      .then(onComplete)
      .catch(onError)
    },
    setTickets({commit}){
      axios.get('http://localhost:3000/tickets')
      .then( response => {
        commit('SET_TICKETS', response.data);
      })
    },
    obtenerTicket({commit}, {id, onComplete, onError}) {
      axios.get(`http://localhost:3000/tickets/${id}`)
      .then( response => {
        commit('SET_TICKET', response.data.data);
        onComplete(response)
      })
      .catch(onError)
    },
    editarTicket({commit}, {id, params, onComplete, onError} ) {
      axios.put(`http://localhost:3000/tickets/${id}`, params)
      .then(onComplete)
      .catch(onError)
    },
    eliminarTicket({commit}, {id, onComplete, onError}){
      axios.delete(`http://localhost:3000/tickets/${id}`)
      .then(onComplete)
      .catch(onError)
    }
  
  },
  /*getters: {
    opcionesPersonal: state => {
      return {
        texto: `${state.personal.per_apellidos}, ${state.personal.per_nombre}`,
        value: state.personal.per_id
      }
    }
  }*/
})
