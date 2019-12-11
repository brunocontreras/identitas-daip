import Vue from "vue";
import Vuex from "vuex";
import readRootDirectory from "@/logic/readRootDirectory";
import { sort } from "@/logic/helpers";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: null,
    current: null,
    log: null
  },
  getters: {
    allVideos: state => {
      const dictionary = {};
      sort(state.data.videos);
      for (let i = 0, l = state.data.videos.length; i < l; i++) {
        const video = state.data.videos[i];
        if (!dictionary[video.name]) dictionary[video.name] = video;
      }
      return Object.values(dictionary);
    },
    allAudios: state => {
      const dictionary = {};
      sort(state.data.audios);
      for (let i = 0, l = state.data.audios.length; i < l; i++) {
        const audio = state.data.audios[i];
        if (!dictionary[audio.name]) dictionary[audio.name] = audio;
      }
      return Object.values(dictionary);
    }
  },
  mutations: {
    SET_DATA: (state, data) => {
      state.data = data;
    },
    SET_CURRENT: (state, current) => {
      state.current = current;
    },
    SET_LOG: (state, log) => {
      state.log = log;
    }
  },
  actions: {
    READ_ROOT_DIRECTORY: ({ commit }, path) => {
      const { data, log } = readRootDirectory(path);
      commit("SET_DATA", data);
      commit("SET_LOG", log);
    },
    CLEAN_DATA: ({ commit }) => {
      commit("SET_DATA", null);
      commit("SET_LOG", null);
    }
  }
});
