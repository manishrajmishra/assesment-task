import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
let nextId = 1;
export const store = new Vuex.Store({
  state: {
    notifications: [],
  },
  getters: {
  },
  mutations: {
    PUSH(state, notification) {
      state.notifications.push({
        ...notification,
        id: nextId++
      });
    },
    DELETE(state, notificationToRemove) {
      state.notifications = state.notifications.filter(
        notification => notification.id !== notificationToRemove.id
      );
    },
  },
  actions: {
    add({ commit }, notification) {
      commit("PUSH", notification);
    },
    remove({ commit }, notificationToRemove) {
      commit("DELETE", notificationToRemove);
    }
  }
})