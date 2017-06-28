<template lang="jade">
  ul.todo-list
    todo-item(
      v-for="todo in todos",
      :key="todo.id",
      :title="todo.title",
      :done="todo.done",
      :id="todo.id",
      :onToggleDone="onToggleDone",
      :onEditTitle="onEditTitle",
    )
</template>

<style scoped>
  ul {
    list-style-type: none;
  }
</style>

<script>
  import TodoItem from './TodoItem.vue';

  export default {
    props: {
      todos: {
        type: Array,
        required: true,
      },
      onTodoItemToggleDone: Function,
      onTodoItemEditTitle: Function,
    },
    components: {
      'todo-item': TodoItem,
    },
    methods: {
      onToggleDone(id) {
        if (!this.onTodoItemToggleDone) return;
        this.onTodoItemToggleDone(id);
      },
      onEditTitle(id, newTitle) {
        if (!this.onTodoItemEditTitle) return;
        this.onTodoItemEditTitle(id, newTitle);
      },
    }
  };
</script>
