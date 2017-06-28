<template lang="jade">
  .todo-item(:class="{ checked: done }")
    .checkbox(@click="onDoneClick")
    .title(v-show="!editing", @dblclick="onTitleClick") {{title}}
    editor(v-show="editing", :editing="editing", :originalText="title", :onSubmit="onEditingDone")
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
  import TextFieldEditor from './TextFieldEditor.vue';

 export default {
     components: {
       editor: TextFieldEditor,
     },

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
      };
    },
    methods: {
      onDoneClick() {
        if (typeof this.onToggleDone !== 'function') return;
        this.onToggleDone(this.id);
      },
      onTitleClick() {
        this.editing = true;
      },
      onEditingDone(newTitle) {
        this.onEditTitle(this.id, newTitle);
        this.editing = false;
      },
    },
  };
</script>
