<template>
  <div class="control__wrapper">
    <div class="control__panel">
      <h3>Управление</h3>
      <div class="control__btns">
        <button type="button" class="btn btn-success" @click="makeMove">Сделать ход</button>
        <button type="button" class="btn btn-warning" @click="this.modalVisible = true">
          Перевод средств</button>
        <button type="button" class="btn btn-danger" @click="endTurn">Закончить ход</button>
        <button type="button" class="btn btn-secondary" @click="addPlayer">Добавить игрока</button>
      </div>

    </div>
    <dialogueModal v-if="this.modalVisible" @close="closeModal" @send="makeTrade"/>
  </div>
</template>

<script>
import dialogueModal from './dialogueModal.vue';

export default {
  data() {
    return {
      modalVisible: false,
    };
  },
  components: { dialogueModal },
  methods: {
    endTurn() {
      this.$store.dispatch('endCurrentTurn');
    },
    addPlayer() {
      this.$store.dispatch('addPlayer');
    },
    makeTrade(payload) {
      this.$store.dispatch('makeTrade', payload);
      this.closeModal();
    },
    makeMove() {
      this.$store.dispatch('makeMove');
    },
    closeModal() {
      this.modalVisible = false;
    },
  },
};
</script>

<style lang="scss">
  .control {
    &__wrapper {
      height: 100%;
      padding: 1rem;
    }
    &__panel {
      display: flex;
      flex-direction: column;
      height: 100%;
      padding: 1rem;
      border: 1px solid aqua;
    }
    &__btns {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
  }

</style>
