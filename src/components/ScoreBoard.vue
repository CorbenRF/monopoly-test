<template>
  <!-- eslint-disable -->
  <div class="score__wrapper">
  <h3>СЧЁТ</h3>
    <ol>
      <li v-for="item in playersInfo" :key="item.id">{{ item.name }}: {{ this.formatSum(item.money) }} монет</li>
    </ol>
  </div>
</template>

<script>
// eslint-disable
import SumFormat from '@/mixins/SumFormat.vue';

export default {
  mixins: [SumFormat],
  computed: {
    playersInfo() {
      const copy = this.$store.getters.getPlayers;
      return copy.toSorted((a, b) => {
        if (a.money > b.money) {
          return -1;
        }
        if (a.money < b.money) {
          return 1;
        }
        return 0;
      });
    },
  },
};
</script>

<style lang="scss">
  .score {
    &__wrapper {
      height: 100%;
      padding: 2rem;
      border: 1px solid blue;
    }
  }
</style>
