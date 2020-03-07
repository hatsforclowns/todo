<template>
  <div class="task" :style="{backgroundColor: colour}">
    <div class="task-name">{{ name }}</div>
    <div class="task-delete" @click="$emit('delete', name)">
      <span class="icon is-medium">
        <i class="mdi mdi-24px mdi-close"></i>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    colour: {
      type: String,
      required: false
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~bulma/sass/utilities/all";

.task {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba($black, 0.1);
  transition: background-color 0.1s ease-out;

  &-name {
    padding: $size-6 0 $size-6 $size-6;
    font-weight: $weight-semibold;
  }

  &-delete {
    padding: $size-6;
    opacity: .2;
    transition: opacity 0.1s ease-out;

    @include desktop() {
      opacity: 0;
    }

    span {
      transition: color 0.1s ease-out;
    }

    &:hover {
      cursor: pointer;

      span {
        color: $danger;
      }
    }

    @at-root .task:hover & {
      opacity: 1;
    }
  }
}
</style>
