<template>
  <div>
    <Shape :shape="shape"
           :top="AnimatedTop"
           :ref="'shape'"
           :index="index"
           :isPaused="IsPaused" />
  </div>
</template>

<script>
  import Shape from './Shape'

  export default {
    name: "FallingShape",
    props: {
      shape: {
        type: Object,
        required: true
      },
      index: {
        type: Number
      },
      timeOut: {
        type: Number
      }
    },
    components: {
      Shape
    },
    data() {
      return {
        ShapeBottom: 0,
        AnimatedTop: this.shape.height,
        timer: 0
      }
    },
    computed: {
      IsPaused() {
        return this.$store.state.IsPaused
      },
      BoardAngle() {
        return this.$store.getters.BoardAngle
      },
      FinalShapePosition() {
        const { top, bottom } = this.GetBoardCoordinates();
        return this.BoardAngle >= 0 ? top + ((bottom - top) / 2) * (1 - this.shape.offset / (BoardWidth / 2))
          : bottom - ((bottom - top) / 2) * (1 - this.shape.offset / (BoardWidth / 2))
      }
    },
    methods: {
      GetBoardCoordinates() {
        const { top, bottom } = document.querySelector('.board').getBoundingClientRect();
        return {
          top, bottom
        }
      },
      AnimateTop() {
        this.AnimatedTop += 20;
      }
    },
    updated() {
      console.log(this.timeOut);
      if (this.IsPaused) {
        return clearTimeout(this.timer);
      }
      if (this.index !== 0)
        return;

      this.ShapeBottom = this.$refs.shape.GetBottomCoordinate();
      this.timer = setTimeout(() => {
        if (this.ShapeBottom >= this.FinalShapePosition - 20) {
          clearTimeout(this.timer);
          this.$store.dispatch('FallFinished');
          this.$emit('finished-falling');
          return;
        }

        this.AnimateTop();
      }, this.timeOut)
    }
  }
</script>

<style lang="scss" scoped>
</style>
