<template>
  <v-app>
      <RouterView />
  </v-app>
</template>

<script>
import { io } from "socket.io-client"
import { mapMutations } from 'vuex'
export default {
  name: 'App',
  created() {
    //const socket = io("https://test-kw53.onrender.com")
    const socket = io("http://localhost:8080/")
    this.setSocket(socket)
  },
  computed: {
  },
  methods: {
    ...mapMutations(["setSocket"])
  }
}
</script>
