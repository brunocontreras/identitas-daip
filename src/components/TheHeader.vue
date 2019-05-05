<template>
  <header class="theheader" :style="{ height: `${height}px` }">
    <the-logo class="logo bc-link bc-link--logo" />
    <app-arrow class="arrow" :height="height" />
    <app-breadcrumb v-if="current" v-slot="{ links }" class="breadcrumb" :item="current">
      <template v-for="(link, i) in links">
        <template v-if="i < links.length - 1">
          <router-link :key="`link${i}`" :to="link.to" class="bc-link">
            <span class="bc-link-name">{{ link.name }}</span>
          </router-link>
          <app-arrow :key="`arrow${i}`" class="arrow" :height="height" />
        </template>
        <span v-else :key="`name${i}`" class="bc-last">{{ link.name }}</span>
      </template>
    </app-breadcrumb>
    <div class="tools">
      <div>
        <button class="tool-button" @click="removeFolder">
          <md-icon>{{ data ? "folder" : "folder_open" }}</md-icon>
        </button>
        <md-tooltip md-direction="bottom">Seleccionar carpeta</md-tooltip>
      </div>
      <div v-if="updateAvailable">
        <button class="tool-button" @click="update">
          <md-icon>arrow_downward</md-icon>
        </button>
        <md-tooltip md-direction="bottom">Nueva actualización</md-tooltip>
      </div>
    </div>
  </header>
</template>

<script>
import { ipcRenderer, shell } from "electron";
import { mapState, mapActions } from "vuex";
import TheLogo from "@/components/TheLogo";
import AppBreadcrumb from "@/components/AppBreadcrumb";
import AppArrow from "@/components/AppArrow";
export default {
  components: {
    TheLogo,
    AppBreadcrumb,
    AppArrow
  },
  data: () => ({
    height: 60,
    updateAvailable: false
  }),
  computed: {
    ...mapState(["data", "current"])
  },
  created() {
    ipcRenderer.on("downloaded", () => {
      this.updateAvailable = true;
    });
    ipcRenderer.on("download", () => {
      this.updateAvailable = true;
    });
  },
  methods: {
    ...mapActions(["CLEAN_DATA"]),
    removeFolder() {
      localStorage.removeItem("root");
      this.CLEAN_DATA();
      this.$router.push("/");
    },
    update() {
      // if (process.platform === "darwin") {
      shell.openExternal("https://identitas.netlify.com/");
      // } else {
      //   ipcRenderer.send("update");
      // }
    }
  }
};
</script>

<style lang="scss" scoped>
.theheader {
  --border-color: #e0e0e0;
  background-color: #fff;
  border-top: 1px solid var(--border-color);
  box-sizing: content-box;
  display: flex;
  align-items: stretch;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.5);
}
.logo {
  flex-shrink: 0;
  ::v-deep svg {
    position: relative;
    top: -6px;
  }
}
.breadcrumb {
  flex-grow: 1;
  display: flex;
}
.bc-link--logo {
  margin-left: 0;
  padding-left: 2rem;
}
.bc-link,
.bc-last {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2rem;
  font-size: 1.8rem;
  padding-left: 3.5rem;
  margin-left: -15px;
}
.bc-link {
  transition-duration: 0.25s;
  transition-timing-function: ease;
  transition-property: background-color, color;
  &:hover {
    background-color: $color-main;
    color: #fff !important;
    text-decoration: none;
    + .arrow ::v-deep path {
      fill: $color-main;
      stroke: $color-main;
    }
  }
}
.bc-link-name {
  display: inline-block;
}
.arrow {
  position: relative;
  z-index: 1;
  ::v-deep path {
    stroke: var(--border-color);
    stroke-width: 1;
    fill: #fff;
    transition-duration: 0.25s;
    transition-property: fill, stroke;
  }
}
.tools {
  flex-grow: 1;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 10px;
}
.tool-button {
  background: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  margin: 0 3px;
  padding: 0;
  cursor: pointer;
  transition: background 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  &:hover,
  &:active,
  &:focus {
    background: $color-main;
    .md-icon {
      color: #fff !important;
    }
  }
}
</style>
