<template>
  <!-- eslint-disable -->
  <div class="backdrop-confirm" @click.self="$emit('close')" @keydown.esc="$emit('close')">
    <div class="modal-custom-confirm container-md">
      <slot class="modal-custom-confirm__message">
        <div class="dialogue__modal">
          <span class="dialogue__modal-msg"
            >Выберете игрока для перевода средств:  <span class="dialogue__modal-bold"></span>
          </span>
          <select name="players" id="players" v-model="this.selectedPlayerId">
            <option v-for="item in playersInfo" :key="item.id" :value="item.id">{{ item.name }}</option>
          </select>
          <!-- <input type="number" :disabled="!this.selectedPlayerId" min="0" :max="availableFunds(this.selectedPlayerId)"
          v-model="this.sumToSend"> -->
          <div class="form-control">
            <span class="input-group-text">Миллионов</span>
            <input type="number" :disabled="!this.selectedPlayerId" min="0" :max="availableFunds(this.selectedPlayerId)/1000000"
          v-model="this.millions">
          </div>

          <div class="form-control">
            <span class="input-group-text">Тысяч</span>
            <input type="number" :disabled="!this.selectedPlayerId" min="0" :max="availableFunds(this.selectedPlayerId)/1000"
          v-model="this.thousands">
          </div>

        </div>
      </slot>
      <div class="buttons-group">
        <button type="button" class="btn btn-success"
        @click="$emit('send', {receipient: selectedPlayerId, amount: this.sumToSend})">ОК</button>

        <!-- <button type="button" class="btn btn-danger" @click="$emit('answer', 0)">Нет</button> -->

        <button type="button" class="btn btn-dark" @click="$emit('close')">Отмена</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedPlayerId: '',
      millions: 0,
      thousands: 0,
      // sumToSend: 0,
    };
  },
  computed: {
    sumToSend() {
      return (this.millions * 1000000) + (this.thousands * 1000);
    },
    currentPlayerInfo() {
      return this.$store.getters.getCurrentPlayer;
    },
    playersInfo() {
      return this.$store.getters.getPlayers.filter((e) => e.id !== this.currentPlayerInfo.id);
    },

  },
  methods: {
    availableFunds(playerId) {
      if (playerId) {
        return this.$store.getters.getPlayers.find((element) => element.id === playerId).money;
      }
      return 0;
    },
  },
};
</script>
<style lang="scss">
.modal-custom-confirm {
  position: relative;
  padding: 3rem !important;
  height: 50%;
  border: 1px blue solid;
  border-radius: 40px;
  // background-color: rgba($color: #555, $alpha: 0.2);
  z-index: 500;
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  &__message {
    margin-bottom: 2rem;
  }
  & > .buttons-group {
    display: flex;
    min-width: 30%;
    max-width: 400px;
    flex-direction: column;

    & :not(:last-child) {
      margin-bottom: 2rem;
    }
  }
}

.backdrop-confirm {
  z-index: 1000;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialogue {
  &__modal {
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
    &-msg {
      font-size: medium;
    }
    &-bold {
      font-size: large;
      font-weight: bold;
    }
  }
}
</style>
