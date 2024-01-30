<template>
  <div class="view container">
    <div class="main-row row row-cols-3">
      <div class="col-3 stats"><ScoreBoard /></div>
      <div class="col-6">
        <InfoScreen />
        <GameBoard />
      </div>
      <div class="col-3 stats"><HistoryBoard /></div>
    </div>

  </div>
</template>

<script>
import GameBoard from '@/components/GameBoard.vue';
import HistoryBoard from '@/components/HistoryBoard.vue';
import ScoreBoard from '@/components/ScoreBoard.vue';
import InfoScreen from '@/components/InfoScreen.vue';

export default {
  components: {
    GameBoard,
    HistoryBoard,
    ScoreBoard,
    InfoScreen,
  },
};
</script>

<style lang="scss">
  .view {
    padding: 2rem;
  }
  .main-row {
    height: 90vh;
  }
  .stats {
    max-height: 100%;
  }
</style>
