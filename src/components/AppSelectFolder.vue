<template>
  <md-dialog :md-active="isActive" :md-close-on-esc="false" :md-click-outside-to-close="false" :md-backdrop="false">
    <md-empty-state
      md-icon="create_new_folder"
      md-label="Añadir contenido"
      md-description="Para poder mostrar las presentaciones debes seleccionar la carpeta con el contenido."
    >
      <md-button class="md-raised md-primary" @click="selectDirectory">Seleccionar carpeta</md-button>
    </md-empty-state>
  </md-dialog>
</template>

<script>
import { remote } from "electron";
import { mapActions } from "vuex";
export default {
  props: {
    isActive: Boolean
  },
  methods: {
    ...mapActions(["READ_ROOT_DIRECTORY"]),
    selectedDirectory(paths) {
      if (paths !== undefined) {
        const dir = paths[0];
        localStorage.setItem("root", dir);
        this.READ_ROOT_DIRECTORY(dir);
      }
    },
    selectDirectory() {
      const options = {
        title: "Selecciona una carpeta",
        properties: ["openDirectory"]
      };
      remote.dialog.showOpenDialog(options, this.selectedDirectory);
    }
  }
};
</script>
