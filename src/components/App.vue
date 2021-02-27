<template>
  <div ref="parent" class="parent">
    <div class="play-zone">
      <FallZone />
      <TeeterBoard />
    </div>
    <div class="game-over" v-if="IsGameOver">
      <span>GAME OVER</span>
    </div>
    <div class="info">
      <img src="static/keys.png" width="250px" height="250px" />
    </div>
  </div>
</template>

<script>
  import FallZone from './FallZone'
  import TeeterBoard from './TeeterBoard'

  export default {
    name: 'app',
    components: {
      FallZone,
      TeeterBoard
    },
    computed: {
      IsGameOver() {
        return this.$store.state.IsGameOver
      }
    }
  }
</script>

<style scoped>
  .play-zone {
    width: 80%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    padding-top: 1rem;
  }

  .info {
    position: absolute;
    right: 20px;
    bottom: 20px;
    background: rgba(255,255,255,0.7);
    border-radius: 20px;
  }

  .game-over {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0,0,0,0.7);
  }

    .game-over span {
      position: absolute;
      background: rgba(255,255,255,0.7);
      border-radius: 20px;
      font-size: 4em;
      font-weight: 700;
      color: #757a7d;
      display: flex;
      align-items: center;
      justify-content: center;
      top: calc(50% - 75px);
      left: calc(50% - 250px);
      width: 500px;
      height: 150px;
    }

  @media only screen and (max-width: 600px) {
    .play-zone {
      width: 100%;
    }

    .info {
      display: none;
    }

    .game-over span {
      position: absolute;
      background: rgba(255,255,255,0.7);
      border-radius: 5px;
      font-size: 2em;
      font-weight: 700;
      color: #757a7d;
      display: flex;
      align-items: center;
      justify-content: center;
      top: calc(50% - 37.5px);
      left: calc(50% - 125px);
      width: 250px;
      height: 75px;
    }
  }
</style>
