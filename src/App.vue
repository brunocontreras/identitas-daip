<template>
  <div id="app" class="app">
    <the-header class="header" />
    <transition name="fade" mode="out-in">
      <router-view class="main" />
    </transition>
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
  flex-grow: 1;
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
  font-family: Omnes !important;
  margin: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
  font-size: 1.4rem;
}
button,
input {
  font-family: inherit;
}
a {
  color: #666 !important;
}
h1 {
  font-size: 4rem;
  font-weight: 400;
  text-align: center;
  line-height: 1.25;
  margin-top: 0;
  margin-bottom: 0;
  color: #fff;
}
::-webkit-scrollbar {
  width: 12px;
  background-color: rgba(255, 255, 255, 0.1);
}
::-webkit-scrollbar-thumb {
  border-radius: 8px;
  border: 3px solid transparent;
  box-shadow: inset 0 0 0 4px #fff;
}
@font-face {
  font-family: "Omnes";
  src: url("~@/assets/fonts/Omnes-Hairline.otf");
  font-weight: 100;
  font-style: normal;
}
@font-face {
  font-family: "Omnes";
  src: url("~@/assets/fonts/Omnes-Light.otf");
  font-weight: 300;
  font-style: normal;
}
@font-face {
  font-family: "Omnes";
  src: url("~@/assets/fonts/Omnes-Regular.otf");
  font-weight: 400;
  font-style: normal;
}
@font-face {
  font-family: "Omnes";
  src: url("~@/assets/fonts/Omnes-Medium.otf");
  font-weight: 500;
  font-style: normal;
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
