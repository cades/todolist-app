<template lang="jade">
  input(
    v-model="editingText",
    @keyup.enter="_onSubmit",
    @blur="_onSubmit",
    ref="input",
  )
</template>

<script>
  export default {
    props: {
      editing: {
        type: Boolean,
        default: false,
      },
      originalText: {
        type: String,
        default: '',
      },
      onSubmit: Function,
    },
    data() {
      return {
        editingText: '',
      };
    },
    methods: {
      _onSubmit() {
        if (typeof this.onSubmit !== 'function') return;
        this.onSubmit(this.editingText);
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
