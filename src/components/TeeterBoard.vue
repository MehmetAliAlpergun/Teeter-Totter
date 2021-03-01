<template>
  <div class="teeter-board">
    <div class="board" :style="{ transform: 'rotate('+ BoardAngle/2+'deg)'}">
      <Shape v-for="shape in LeftSideShapes"
             :shape="shape"
             :key="shape.id" />
      <Shape v-for="shape in RightSideShapes"
             :shape="shape"
             :side="true"
             :key="shape.id" />
    </div>
    <div class="pillar"></div>
  </div>
</template>

<script>
  import Shape from './Shape'
  import { mapState, mapMutations } from 'vuex'

  export default {
    name: "TeeterBoard",
    components: {
      Shape
    },
    computed: {
      ...mapState([
        'RightSideShapes',
        'LeftSideShapes'
      ]),
      BoardAngle() {
        return this.$store.getters.BoardAngle
      }
    },
    methods: {
      ...mapMutations([
        'AddRightShape'
      ])
    },
    beforeMount() {
      this.AddRightShape()
    }
  }
</script>

<style scoped>
  .teeter-board {
    height: 20%;
    width: 60%;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
  }

  .board {
    width: 100%;
    height: 0.5rem;
    min-height:10px;
    background-color: #263238;
    position: relative;
    transform: rotate(0deg);
    transition: transform 0.4s ease-in-out;
    border-radius: 0.25rem;
  }

  .pillar {
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 150px 200px 150px;
    border-color: transparent transparent #263238 transparent;
    filter: drop-shadow(-5px 2px 3px #263238);
  }


  @media only screen and (max-width: 600px) {
    .teeter-board {
      width: 100%;
    }

    .pillar {
      border-width: 0 50px 75px 50px;
    }
  }
</style>
