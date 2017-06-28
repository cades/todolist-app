<template lang="jade">
  .todo-app
    h1 Todo List
    search-bar(:onChange="onSearchTextChange")
    button(@click="showRemoveButton = !showRemoveButton")
      {{ showRemoveButton ? 'Hide Remove' : 'Remove' }}
    button(@click="clearCompletedTasks") clear completed

    todo-list(
      :showRemoveButton="showRemoveButton",
      :todos="filteredTodos",
      :onTodoItemToggleDone="onTodoItemToggleDone",
      :onTodoItemEditTitle="onTodoItemEditTitle",
      :onTodoItemRemove="onTodoItemRemove",
    )
</template>

<style>
</style>

<script>
  import SearchBar from './SearchBar.vue';
  import TodoList from './TodoList.vue';

  export default {

    components: {
      'search-bar': SearchBar,
      'todo-list': TodoList,
    },

    data() {
      return {
        searchText: '',
        showRemoveButton: false,
        todos: [{
          id: '111',
          title: '唱題',
          done: false,
        }, {
          id: '222',
          title: '寫面試題',
          done: false,
        }, {
          id: '333',
          title: '反省',
          done: true,
        }],
      }
    },

    computed: {
      filteredTodos() {
        if (!this.searchText)
          return this.todos;
        const target = new RegExp(this.searchText);
        return this.todos.filter(item => item.title.match(target));
      },
    },

    methods: {
      onSearchTextChange(searchText) {
        this.searchText = searchText;
        console.log('searchText = ' + searchText)
      },
      onTodoItemToggleDone(id) {
        const todo = this.getTodoById(id);
        todo.done = !todo.done;
      },
      onTodoItemEditTitle(id, newTitle) {
        const todo = this.getTodoById(id);
        todo.title = newTitle;
      },
      onTodoItemRemove(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
      },
      clearCompletedTasks() {
        this.todos = this.todos.filter(todo => !todo.done);
      },
      getTodoById(id) {
        return this.todos.find(todo => todo.id === id);
      },
    },
  };
</script>
