<template>
  <div class="tile" :class="[`${direction}`]">
    {{ id }}
    <div class="tile__content">
      <slot>
      <span>{{ this.effectNum }}</span>

    </slot>
    <span class="tile__position" v-for="item in isOccupiedByPlayer" :key="item.id">
    {{ item.name }}
    </span>
    </div>
  </div>
</template>

<script>
// eslint-disable
export default {
  props: ['direction', 'id', 'effect'],
  computed: {
    effectNum() {
      const num = new Intl.NumberFormat('ru-RU').format(
        this.effect,
      );
      return num;
    },
    isOccupiedByPlayer() {
      // eslint-disable-next-line
      let players = [];
      this.$store.getters.getPlayers.forEach((e) => {
        // eslint-disable-next-line
        if (e.position == this.id) {
          players.push(e);
        }
      });
      return players;
    },
  },
};
</script>

<style lang="scss">
  .tile {
    display: block;
    aspect-ratio: 1 / 1;
    border: 1px dashed red;
    &__content {
      display: flex;
      flex-direction: column;
    }
    &__position {
      font-weight: bold;
    }
  }
  .horizontal {
    width: calc(100%/6);
}
.vertical {
  width: 100%;
}
</style>
