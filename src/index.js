import Vue from 'vue';
import TodoApp from './TodoApp.vue'

window.app = new Vue({
  el: '#app',
  components: {
    'todo-app': TodoApp,
  },
  template: `<todo-app></todo-app>`
});
