<template>
  <section class="fall-zone">
    <FallingShape v-for="(shape, index) in FallingShapes"
                  v-show="index ==0"
                  :shape="shape"
                  :index="index"
                  :timeOut="timeOut"
                  @finished-falling="onFinishFalling"
                  :key="shape.id">
    </FallingShape>
  </section>
</template>

<script>
  import FallingShape from './FallingShape'
  import { mapMutations } from 'vuex'

  export default {
    name: "FallZone",
    components: {
      FallingShape
    },
    data() {
      return {
        timeOut: Timeout,
        iterationCounter: 0
      }
    },
    computed: {
      FallingShapes() {
        return this.$store.state.FallingShapes;
      }
    },
    methods: {
      ...mapMutations([
        'TogglePause',
        'StartFall',
        'Initialize',
        'MoveShapeRight',
        'MoveShapeLeft',
      ]),
      onKeyDown(ev) {
        if (ev.keyCode === 32) this.TogglePause(); // SPACE
        if (ev.keyCode === 40) this.StartFall(); // DOWN_ARROW
        if (ev.keyCode === 39) this.MoveShapeRight(); // RIGHT_ARROW
        if (ev.keyCode === 37) this.MoveShapeLeft(); // LEFT_ARROW
        if (ev.keyCode === 82) this.$store.dispatch('NewGame'); //R
      },
      onFinishFalling() {
        this.iterationCounter++;
        if (this.iterationCounter === IterationCountIncreasing) {
          this.timeOut -= TimeoutStepDecreasing;
          this.iterationCounter = 0;
        }
      }
    },
    mounted() {
    },
    beforeMount() {
      this.Initialize();
      window.addEventListener('keydown', this.onKeyDown)
    },
    beforeDestroy() {
      window.removeEventListener('keydown', this.onKeyDown)
    }
  }
</script>

<style lang="scss" scoped>
  .fall-zone {
    height: 80%;
    width: 60%;
    margin: auto;
    position: relative;
    background: rgba(255,255,255,0.4);
    border-radius: 15px;
  }

  @media only screen and (max-width: 600px) {
    .fall-zone {
      width: 100%;
      border-radius: 5px;
    }
  }
</style>
