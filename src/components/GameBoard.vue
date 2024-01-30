<template>
  <div class="board__wrapper">
    <div class="tiles__toprow">
      <BoardTile id="16" effect="-500000" direction="horizontal"></BoardTile>
      <BoardTile id="17" effect="123000" direction="horizontal"></BoardTile>
      <BoardTile id="18" effect="2000000" direction="horizontal"></BoardTile>
      <BoardTile id="19" effect="-4000000" direction="horizontal"></BoardTile>
      <BoardTile id="20" effect="0" direction="horizontal"></BoardTile>
      <BoardTile id="1" effect="10000000" direction="horizontal"></BoardTile>
    </div>

    <div class="tiles__mid">
      <div class="tiles__midleft">
      <BoardTile id="15" effect="-111000" direction="vertical"></BoardTile>
      <BoardTile id="14" effect="1500000" direction="vertical"></BoardTile>
      <BoardTile id="13" effect="-500000" direction="vertical"></BoardTile>
      <BoardTile id="12" effect="1000000" direction="vertical"></BoardTile>
    </div>
    <div class="board__control">
      <ControlsPanel />
    </div>

    <div class="tiles__midright">
      <BoardTile id="2" effect="-3000000" direction="vertical"></BoardTile>
      <BoardTile id="3" effect="-200000" direction="vertical"></BoardTile>
      <BoardTile id="4" effect="321000" direction="vertical"></BoardTile>
      <BoardTile id="5" effect="-5000000" direction="vertical"></BoardTile>
    </div>
    </div>

    <div class="tiles__botrow">
      <BoardTile id="11" effect="5000" direction="horizontal"></BoardTile>
      <BoardTile id="10" effect="-25000" direction="horizontal"></BoardTile>
      <BoardTile id="9" effect="-25000000" direction="horizontal"></BoardTile>
      <BoardTile id="8" effect="10000000" direction="horizontal"></BoardTile>
      <BoardTile id="7" effect="-11000000" direction="horizontal"></BoardTile>
      <BoardTile id="6" effect="500000" direction="horizontal"></BoardTile>
    </div>

  </div>
</template>

<script>
import ControlsPanel from '@/components/ControlsPanel.vue';
import BoardTile from '@/components/boardUI/BoardTile.vue';

export default {
  components: {
    ControlsPanel,
    BoardTile,
  },

};
</script>

<style lang="scss">
  .board {
    &__wrapper {
      position: relative;
    aspect-ratio: 1 / 1;
      width: 100%;
      display: flex;
      flex-direction: column;
      border: 1px solid blue;
    }
    &__control {
      width: calc(100%/6*4);
    }
  }
  .tiles {
    &__toprow {
      width: 100%;
      display: flex;
    }
    &__mid {
      display: flex;
    }
    &__botrow {
      width: 100%;
      display: flex;
    }
    &__midleft {
      display: flex;
      flex-direction: column;
      width: calc(100%/6);
    }
    &__midright {
      display: flex;
      flex-direction: column;
      width: calc(100%/6);
    }
  }
</style>
