<template lang="jade">
  li.todo-item(:class="{ checked: done }")
    .checkbox(@click="onDoneClick")
    .title(v-show="!editing", @dblclick="onTitleClick") {{title}}
    input(
      v-show="editing",
      v-model="editingText",
      @keyup.enter="onEditingDone",
      @blur="onEditingDone",
      ref="input",
    )
</template>

<style scoped>
 .title, .checkbox {
   display: inline-block;
 }

 .checkbox {
     width: 10px;
     height: 10px;
     border: solid 1px black;
     margin-right: 10px;
 }

 .checked .title {
   text-decoration: line-through;
  }

 .checked .checkbox {
    background-color: black;
  }
</style>

<script>
  export default {
    props: {
      title: {
        type: String,
        required: true,
      },
      done: {
        type: Boolean,
        required: true,
      },
      id: {
        type: String,
        required: true,
      },
      onToggleDone: Function,
      onEditTitle: Function,
    },
    data() {
      return {
        editing: false,
        editingText: '',
      };
    },
    methods: {
      onDoneClick() {
        if (typeof this.onToggleDone !== 'function') return;
        this.onToggleDone(this.id);
      },
      onTitleClick() {
        this.editingText = this.title;
        this.editing = true;
        this.$nextTick(() => this.$refs.input.focus());
      },
      onEditingDone() {
        if (typeof this.onEditTitle !== 'function') return;
        this.onEditTitle(this.id, this.editingText);
        this.editing = false;
      },
    },
  };
</script>
