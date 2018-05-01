<template>
  <nav class="helper">
    <span class="helper-left">{{ remainder }} items left</span>
    <!-- <ul class="helper-buttons">
      <li
      v-for=" item of status"
      :key="item"
      :class="[item, selected === item ? 'activated' : '']"
      @click="toggleSelect(item)"
      >{{ item }}</li>
    </ul> -->
    <span class="clear" @click="clearAllCompleted">Clear Completed</span>
  </nav>
</template>

<script>
export default {
  props: {
    selected: { // 当前选中的状态
      type: String,
      required: true
    },
    remainder: {
      type: Number,
      required: true
    }
  },

  methods: {
    clearAllCompleted () {
      this.$emit('clearCompleted')
    }

    // toggleSelect (item) {
    //   this.$emit('userSelect', item)
    // }
  }

  // data () {
  //   return {
  //     status: ['all', 'active', 'completed']
  //   }
  // },
}
</script>

<style lang="scss" scoped>
 @import '~scss/utils.scss';

.helper {
  font-weight: 100;
  display: flex;
  justify-content: space-around;
  padding: 5px 0;
  line-height: 30px;
  background: $color-empty;
  font-size: 14px;
}

.helper-left, .clear, .helper-buttons {
  padding: 0 10px;
}

.helper-left, .clear {
  width: 150px;
}

.clear {
  cursor: pointer;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0);
  &:hover {
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
  &:active {
    border: 1px solid rgba(0, 0, 0, 0.5);
  }
}

// .helper-buttons {
//   width: 200px;
//   display: flex;
//   justify-content: space-around;
//   margin: 0;
//   padding: 0;
//   .all, .active, .completed {
//     display: inline-block;
//     padding: 0 10px;
//     cursor: pointer;
//     border-radius: 5px;
//     border: 1px solid rgba(0, 0, 0, 0);
//     &.activated {
//       border-color: rgba(0, 0, 0, 0.5);
//     }
//   }
// }

</style>
