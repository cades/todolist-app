<template lang="jade">
  input(
    v-model="editingText",
    @keyup.enter="onSubmit",
    @blur="onSubmit",
    ref="input",
  )
</template>

<script>
  export default {
    props: {
      editing: {
        type: Boolean,
        required: true,
      },
      originalText: {
        type: String,
        required: true,
      },
      onEditingDone: Function,
    },
    data() {
      return {
        editingText: '',
      };
    },
    methods: {
      onSubmit() {
        if (typeof this.onEditingDone !== 'function') return;
        this.onEditingDone(this.editingText);
        this.editingText = '';
      },
    },
    watch: {
      editing(isEditing) {
        if (!isEditing) return;
        this.editingText = this.originalText;
        this.$refs.input.focus();
      },
    }
  };
</script>
