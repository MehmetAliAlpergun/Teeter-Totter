<template>
  <div :class="ShapeType"
       :style="ShapePosition"
       :ref="'element'">
    <span class="inner-text">{{ shape.weight }}kg</span>
  </div>
</template>

<script>
  export default {
    name: "Shape",
    props: {
      shape: {
        type: Object,
        required: true
      },
      side: {
        type: Boolean
      },
      top: {
        type: Number
      }
    },
    methods: {
      roundUp(number) {
        return Math.round(number * 100) / 100
      },
      GetBottomCoordinate() {
        const domElement = this.$refs.element;

        return domElement.getBoundingClientRect().bottom;
      }
    },
    computed: {
      ShapeType() {
        switch (this.shape.type) {
          case 0:
            return 'circle';
          case 1:
            return 'triangle';
          case 2:
            return 'rectangle'
        }
      },
      ShapePosition() {
        var height = this.roundUp(this.shape.height);

        if (height < 40) {
          height = 40;
        }

        const topOffset = this.top || 0;
        var leftOffset = 0;

        if (this.side) {
          leftOffset = 50 + this.shape.offset * 10;
        }
        else {
          leftOffset = 50 - this.shape.offset * 10;;
        }

        if (this.shape.type !== 1) {
          return {
            top: `${topOffset}px`,
            left: `${leftOffset}%`,
            height: `${height}px`,
            width: `${height}px`,
            lineHeight: `${height}px`
          };
        }
        else {
          return {
            top: `${topOffset}px`,
            left: `${leftOffset}%`,
            borderWidth: `0 ${height}px ${this.roundUp(height * 1.25)}px ${height}px `,
            lineHeight: `${this.roundUp(height * 1.2)}px`
          };
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
  .circle, .rectangle, .triangle {
    position: absolute;
    transform: translate(-50%, -100%);
    text-align: center;
    display: flex;
    justify-content: center
  }

  .circle {
    background: #B6CC76;
    border-radius: 50%;
  }

  .triangle {
    width: 0;
    height: 0;
    line-height: 4rem;
    border-style: solid;
    border-color: transparent transparent #224422 transparent
  }

  .rectangle {
    background: #AA3333;
  }

  .inner-text {
    color: white;
  }
</style>
