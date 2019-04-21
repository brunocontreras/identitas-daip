<template>
  <div id="app" class="app">
    <the-header class="header" />
    <router-view class="main" />
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader";
export default {
  components: {
    TheHeader
  }
};
</script>

<style lang="scss" scoped>
.app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
.header {
  flex-shrink: 0;
  position: relative;
  z-index: 1;
}
.main {
  overflow: auto;
}
</style>

<style>
*,
:after,
:before {
  box-sizing: border-box;
}
html {
  font-size: 10px;
}
body {
  font-family: Roboto;
  margin: 0;
  height: 100%;
  width: 100%;
  /* overflow: hidden; */
  font-size: 1.4rem;
}
input {
  font-family: inherit;
}
a {
  color: #666 !important;
}
@font-face {
  font-family: "Roboto";
  src: url("~@/assets/fonts/Roboto-Regular.ttf");
  font-weight: 400;
  font-style: normal;
}
@font-face {
  font-family: "Roboto";
  src: url("~@/assets/fonts/Roboto-Italic.ttf");
  font-weight: 400;
  font-style: italic;
}
@font-face {
  font-family: "Roboto";
  src: url("~@/assets/fonts/Roboto-Medium.ttf");
  font-weight: 500;
  font-style: normal;
}
@font-face {
  font-family: "Roboto";
  src: url("~@/assets/fonts/Roboto-Bold.ttf");
  font-weight: 700;
  font-style: normal;
}
@font-face {
  font-family: "Material Icons";
  src: url("~@/assets/fonts/Material-Icons.woff2");
  font-style: normal;
  font-weight: 400;
}
.material-icons {
  font-family: "Material Icons";
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: "liga";
  -webkit-font-smoothing: antialiased;
}
</style>
