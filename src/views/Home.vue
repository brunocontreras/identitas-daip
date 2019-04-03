<template>
  <div class="home">
    <p class="message">{{ message }}</p>
    <div><button v-if="newUpdate" @click="click">Actualizar</button></div>
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import { ipcRenderer } from "electron";
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld
  },
  data: () => ({
    message: "",
    newUpdate: false
  }),
  created() {
    ipcRenderer.on("message", (event, text) => {
      this.message = text;
    });
    ipcRenderer.on("downloaded", () => {
      this.newUpdate = true;
    });
  },
  methods: {
    click() {
      ipcRenderer.send("update");
    }
  }
};
</script>

<style>
.message {
  background-color: #eee;
}
</style>
