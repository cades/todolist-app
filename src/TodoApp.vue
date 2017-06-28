<template lang="jade">
  .todo-app
    h1 Todo List
    .row
      .control
        | ➕ 
        editor(:onSubmit="addTodo")
      .control
        button(@click="showRemoveButton = !showRemoveButton")
          {{ showRemoveButton ? 'Hide Remove' : 'Remove Task' }}
    .row
      .control
        | 🔎 
        input(v-model="searchText")
      .control
        button(@click="clearCompletedTasks") clear completed

    todo-list(
      :showRemoveButton="showRemoveButton",
      :todos="filteredTodos",
      :onTodoItemToggleDone="onTodoItemToggleDone",
      :onTodoItemEditTitle="onTodoItemEditTitle",
      :onTodoItemRemove="onTodoItemRemove",
    )
</template>

<style scoped>
 .control {
    display: inline-block;
    margin-right: 10px;
 }
</style>

<script>
  import TextFieldEditor from './TextFieldEditor.vue';
  import TodoList from './TodoList.vue';

  export default {

    components: {
      'editor': TextFieldEditor,
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
      onTodoItemToggleDone(id) {
        const todo = this.getTodoById(id);
        todo.done = !todo.done;
      },
      onTodoItemEditTitle(id, newTitle) {
        if (!newTitle) return alert('todo can not be empty!')
        const todo = this.getTodoById(id);
        todo.title = newTitle;
      },
      onTodoItemRemove(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
      },
      clearCompletedTasks() {
        this.todos = this.todos.filter(todo => !todo.done);
      },
      addTodo(text) {
        if (!text) return;
        this.todos.push({
          id: Date.now() + '',
          title: text,
          done: false,
        });
      },
      getTodoById(id) {
        return this.todos.find(todo => todo.id === id);
      },
    },
  };
</script>
