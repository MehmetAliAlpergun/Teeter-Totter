import Vue from 'vue';
import Vuex from 'vuex';
import { Howl } from 'howler';
Vue.use(Vuex);

function GenerateRandomShape() {
  var weight = Math.floor(Math.random() * MaxWeight) + MinWeight;
  return {
    id: Math.floor(Math.random() * Date.now()),
    type: Math.floor(Math.random() * ShapeCount),
    weight,
    offset: Math.floor(Math.random() * BoardWidth / 2) + 1,
    height: weight * 15
  }
};

function CalculateTotalForce(array) {
  return array.reduce((acc, item) => {
    return acc += item.weight * item.offset
  }, 0);
};



export default new Vuex.Store({
  state: {
    IsGameOver: false,
    IsPaused: true,
    LeftSideShapes: [],
    RightSideShapes: [],
    FallingShapes: [],
    EndGameSound: new Howl({
      loop: false,
      src: ['static/endgame.mp3']
    })
  },
  getters: {
    LeftSum(state) {
      return CalculateTotalForce(state.LeftSideShapes)
    },
    RightSum(state) {
      return CalculateTotalForce(state.RightSideShapes)
    },
    BoardAngle(state, getters) {
      if (!getters.LeftSum)
        return MaxBendingAngle;

      if (getters.LeftSum === getters.RightSum)
        return 0;

      var absDiff = Math.abs(getters.LeftSum - getters.RightSum);
      var maxSum = Math.max(getters.LeftSum, getters.RightSum);

      var bendingAngle = (absDiff / maxSum) * 100;

      if (getters.LeftSum > getters.RightSum) {
        return -bendingAngle;
      }
      else {
        return bendingAngle;
      }
    },
    gameOverStatus(state, getters) {
      var absDiff = Math.abs(getters.LeftSum - getters.RightSum);

      console.log(getters.BoardAngle);
      console.log(absDiff);
      return Math.abs(getters.BoardAngle) > MaxBendingAngle || absDiff > MaxSumDifference
    }
  },
  mutations: {
    TogglePause(state) {
      state.IsPaused = !state.IsPaused
    },
    StartFall(state) {
      if (state.IsGameOver) {
        this.dispatch("NewGame");
      }
      else if (state.IsPaused) {
        state.IsPaused = false;
      }
    },
    AddRightShape(state) {
      state.RightSideShapes.push(GenerateRandomShape())
    },
    AddLeftShape(state) {
      const shape = state.FallingShapes.shift();
      state.LeftSideShapes.push(shape)
    },
    Initialize(state) {
      state.FallingShapes = [];
      for (let i = 0; i < 2; i++) {
        state.FallingShapes.push(GenerateRandomShape())
      }
    },
    AddShape(state) {
      state.FallingShapes.push(GenerateRandomShape())
    },
    MoveShapeRight(state) {
      if (state.IsPaused || state.FallingShapes[0].offset - 1 <= 0) return;
      state.FallingShapes[0].offset -= 1;
    },
    MoveShapeLeft(state) {
      if (state.IsPaused || state.FallingShapes[0].offset + 1 > 5) return;
      state.FallingShapes[0].offset += 1;
    },
    Reset(state) {
      state.IsGameOver = false;
      state.IsPaused = true;
      state.LeftSideShapes = [];
      state.RightSideShapes = [];
      state.FallingShapes = [];
      state.FallingShape = '';
      state.NextFallingShape = '';
    }
  },
  actions: {
    FallFinished({ commit, state, getters, dispatch }) {
      commit('AddLeftShape');
      commit('AddShape');
      if (state.LeftSideShapes.length && state.LeftSideShapes.length !== state.RightSideShapes.length) {
        commit('AddRightShape');
      }

      if (getters.gameOverStatus) {
        state.EndGameSound.play();

        setTimeout(() => {
          //alert('Game Over');
          //dispatch("NewGame");
          state.IsGameOver = true;
          state.IsPaused = true;
        }, 200);
      }
    },
    NewGame({ commit }) {
      commit('Reset');
      commit('AddRightShape');
      commit('Initialize');
    }
  }
})
