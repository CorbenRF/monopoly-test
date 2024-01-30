/* eslint-disable */
import { createStore } from 'vuex';

function pluralize(number, one, two, five) {
  let n = Math.abs(number);
  n %= 100;
  if (n >= 5 && n <= 20) {
    return five;
  }
  n %= 10;
  if (n === 1) {
    return one;
  }
  if (n >= 2 && n <= 4) {
    return two;
  }
  return five;
};

function formatSum(sum) {
  let strOutput = '';
  let copySum = sum;
  if(sum < 0) {
    strOutput += '-';
    copySum *= -1;
  }

  const millions = Math.floor(copySum / 1000000);
  const thousands = Math.floor((copySum % 1000000) / 1000);

  if (millions > 0) {
    strOutput += `${millions} ${pluralize(millions, 'миллион', 'миллиона', 'миллионов')} `;
  }

  if (thousands > 0 || millions === 0) {
    strOutput += `${thousands} ${pluralize(thousands, 'тысяча', 'тысячи', 'тысяч')}`;
  }

  return strOutput.trim();
};



export default createStore({
  state: localStorage.getItem('gameState') ? JSON.parse(localStorage.getItem('gameState')) : {
    numberOfCreatedPlayers: 2,
    historyLedger: 1,
    playerToGo: 0,
    screenMsg: '',
    players:  [
      {
        id: 1,
        name: `Игрок1`,
        money: 15000000,
        position: 1,
      },
      {
        id: 2,
        name: `Игрок2`,
        money: 15000000,
        position: 1,
      },
    ],
    history: [
      {
        id: 1,
        timestamp: new Date().toLocaleTimeString(),
        event: 'Игра началась!',
      }
    ],
    positions: [
      10000000, -3000000, -200000, 321000, -5000000, 500000, -11000000, 10000000, -25000000, -25000, 5000, 1000000, -500000,
      1500000, -111000, -500000, 123000, 2000000, -4000000, 0
    ],
  },
  getters: {
    getStorageLength() {
      if(localStorage.getItem('gameState')) {
        return localStorage.getItem('gameState').length;
      }
      return 0;
    },
    getPlayers(state) {
      return state.players;
    },
    getHistory(state) {
      return state.history;
    },
    getCurrentPlayer(state) {
      return state.players[state.playerToGo];
    },
    getPlayerToGo(state){
      return state.playerToGo;
    },
    getScreen(state) {
      if(!state.screenMsg) {
        return `Ход игрока ${state.players[state.playerToGo].name}!`;
      }
      return state.screenMsg;
    }
  },
  mutations: {
    SaveGame(state) {
      localStorage.setItem('gameState', JSON.stringify(state));
    },
    EndTurn(state) {
      if(state.playerToGo < state.players.length) {
        const endTurnEvent = {
          id: ++state.historyLedger,
          timestamp: new Date().toLocaleTimeString(),
          event: `Ход игрока ${state.players[state.playerToGo].name} окончен!`,
        };
        state.history.push(endTurnEvent);
        state.screenMsg = endTurnEvent.event;
      }
      if(++state.playerToGo >= state.players.length) {
        state.playerToGo = 0;
      }
      state.screenMsg += ` Ход игрока ${state.players[state.playerToGo].name}!`;
    },
    AddPlayer(state) {
      state.players.push({
        id: ++state.numberOfCreatedPlayers,
        name: `Игрок${state.numberOfCreatedPlayers}`,
        money: 15000000,
        position: 1,
      });
      state.screenMsg = `Игрок${state.numberOfCreatedPlayers} добавлен в игру!`;
      const newPlayerEvent = {
        id: ++state.historyLedger,
        timestamp: new Date().toLocaleTimeString(),
        event: state.screenMsg,
      };
      state.history.push(newPlayerEvent);
    },
    MakeTrade(state, payload) {
      state.players[state.playerToGo].money -= payload.amount;
      state.players.find((e) => e.id == payload.receipient).money += payload.amount;
      state.screenMsg = `${state.players[state.playerToGo].name} переводит ${formatSum(payload.amount)} монет игроку ${state.players.find((e) => e.id == payload.receipient).name}`;
      const newPlayerEvent = {
        id: ++state.historyLedger,
        timestamp: new Date().toLocaleTimeString(),
        event: state.screenMsg,
      };
      state.history.push(newPlayerEvent);
    },
    MakeMove(state) {
      const throwDice = Math.floor(Math.random() * 6) +1;
      const player = state.players[state.playerToGo];
      if((player.position + throwDice) > 20) {
        player.position = player.position - 20 + throwDice;
      } else {
        player.position += throwDice;
      }
      state.screenMsg = `${player.name} бросает ${throwDice} и встает на поле ${player.position}`;
      const newPlayerEvent = {
        id: ++state.historyLedger,
        timestamp: new Date().toLocaleTimeString(),
        event: state.screenMsg,
      };
      state.history.push(newPlayerEvent);
      player.money += state.positions[(player.position-1)];
      const str = formatSum(state.positions[(player.position-1)]);
      state.screenMsg = `${player.name} ${state.positions[(player.position-1)] >= 0 ? 'получает' : 'теряет'} ${str} монет, встав на поле ${player.position}`;
      const anotherPlayerEvent = {
        id: ++state.historyLedger,
        timestamp: new Date().toLocaleTimeString(),
        event: state.screenMsg,
      };
      state.history.push(anotherPlayerEvent);

      if(player.money <= -5000000) {
        state.screenMsg = `${player.name} Проиграл и выбыл из игры!`;
      const anotherPlayerEvent = {
        id: ++state.historyLedger,
        timestamp: new Date().toLocaleTimeString(),
        event: state.screenMsg,
      };
      state.history.push(anotherPlayerEvent);
      state.players = state.players.filter((e) => e.id !== player.id);
      state.playerToGo = state.playerToGo > 0 ? (state.playerToGo - 1) : 0;
      }
    },
  },
  actions: {
    saveGame({ commit }) {
      commit('SaveGame');
      console.log('game saved!');
    },
    clearStorage() {
      localStorage.clear();
    },
    endCurrentTurn({ commit }) {
      commit('EndTurn');
      this.dispatch('saveGame');
    },
    addPlayer({ commit }) {
      commit('AddPlayer');
      this.dispatch('saveGame');
    },
    makeTrade({ commit }, payload) {
      commit('MakeTrade', payload);
      this.dispatch('saveGame');
    },
    makeMove({ commit }) {
      commit('MakeMove');
      commit('EndTurn');
      this.dispatch('saveGame');
    },
  },
  modules: {
  },
});
