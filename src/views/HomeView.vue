<template>
  <div class="home">
    <h1>Welcome to Monopoly!</h1>
    <button type="button" class="btn btn-primary mb-2" @click="clearStorage">
        Start new game
    </button>
    <button type="button" class="btn btn-primary"  v-if="getStorageLength > 0">
    <router-link to="/game" class="btn-text">
        Continue playing
      </router-link>
    </button>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'HomeView',
  data() {
    return {
      clearlc: false,
    };
  },
  components: {

  },
  computed: {
    getStorageLength() {
      return this.$store.getters.getStorageLength;
    },
  },
  methods: {
    clearStorage() {
      this.clearlc = true;
      window.localStorage.clear();
      this.$store.replaceState({
        numberOfCreatedPlayers: 2,
        historyLedger: 1,
        playerToGo: 0,
        screenMsg: '',
        players: [
          {
            id: 1,
            name: 'Игрок1',
            money: 15000000,
            position: 1,
          },
          {
            id: 2,
            name: 'Игрок2',
            money: 15000000,
            position: 1,
          },
        ],
        history: [
          {
            id: 1,
            timestamp: new Date().toLocaleTimeString(),
            event: 'Игра началась!',
          },
        ],
        positions: [
          10000000, -3000000, -200000, 321000, -5000000, 500000,
          -11000000, 10000000, -25000000, -25000, 5000, 1000000, -500000,
          1500000, -111000, -500000, 123000, 2000000, -4000000, 0,
        ],
      });
      this.$router.push('/game');
    },
  },
};
</script>

<style lang="scss">
  .btn {
    &-text {
      text-decoration: none;
      color: inherit;
    }
  }
  .home {
    display: flex;
    flex-direction: column;
    align-items: center;
    & > * {
      display: block;
      width: max-content;
    }
  }
</style>
