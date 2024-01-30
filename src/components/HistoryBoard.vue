<template>
  <div class="history__wrapper">
    <h3>История</h3>
    <ol class="history__list">
      <li v-for="item in historyInfo" :key="item.id">{{ item.timestamp }} - {{ item.event }}</li>
    </ol>
  </div>
</template>

<script>
export default {
  computed: {
    historyInfo() {
      return this.$store.getters.getHistory;
      // if (historyArr.length > 12) {
      //   return historyArr.slice(-12);
      // }
      // return historyArr;
    },
  },
};
</script>

<style lang="scss">
  .history {
      &__wrapper {
        height: 100%;
        padding: 2rem;
        border: 1px solid blue;
      }
      &__list {
        height: 90%;
        overflow-y: scroll;
        overscroll-behavior-y: contain;
        scroll-snap-type: y proximity;
        & >li:last-child {
  scroll-snap-align: end;
}
      }
    }
</style>
