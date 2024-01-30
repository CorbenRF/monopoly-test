<template>
  <div class="screen__wrapper">
    <h4>{{ getScreenMsg }}</h4>
  </div>
</template>

<script>
export default {
  computed: {
    getScreenMsg() {
      return this.$store.getters.getScreen;
    },
  },
};
</script>

<style lang="scss">
  .screen {
    &__wrapper {
      margin-bottom: 3rem;
      padding: 1rem;
      border: 1px red solid;
    }
  }
</style>
