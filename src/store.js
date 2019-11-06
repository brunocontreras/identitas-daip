import Vue from "vue";
import Vuex from "vuex";
import readRootDirectory from "@/logic/readRootDirectory";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: null,
    current: null,
    log: null
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
