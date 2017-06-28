<template lang="jade">
  ul.todo-list
    li(v-for="todo in todos")
      .close(v-show="showRemoveButton", @click="onRemove(todo.id)") ❌
      todo-item(
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
  .close {
    display: inline-block;
    margin-right: 10px;
  }
  .todo-item {
    display: inline-block;
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
      showRemoveButton: Boolean,
      onTodoItemToggleDone: Function,
      onTodoItemEditTitle: Function,
      onTodoItemRemove: Function,
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
      onRemove(id) {
        if (!this.onTodoItemRemove) return;
        this.onTodoItemRemove(id);
      },
    }
  };
</script>
