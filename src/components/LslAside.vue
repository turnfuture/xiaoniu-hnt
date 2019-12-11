<template>
  <aside :class="$style.aside">
    <div :class="$style.title">
      <slot></slot>
    </div>
    <ul>
      <li v-for="(item, index) in asideList" :key="item.id" @click="bindLook(index)" :class="active === index ? $style.active : ''">
        {{item.title}}
      </li>
    </ul>
  </aside>
</template>

<script>

export default {
  name: 'lslAside',
  props: {
    asideList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data () {
    return {
      active: 0
    }
  },
  methods: {
    bindLook(index) {
      this.active = index;
      this.$emit('bind-current', index);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" module>
  $color: #D2393D;
  $active-color: #fff;
  .aside {
    width: 220px;
    margin-top: -130px;
    padding-bottom: 40px;

    .title {
      height: 130px;
      background: $color;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      h2 {
        font-size: 33px;
        color: $active-color;
        margin: 0 0 5px;
        font-weight: normal;
      }

      p {
        font-size: 18px;
        color: $active-color;
        margin: 0;
      }
    }

    ul {
      padding: 0;
      margin: 0;
      border-bottom: 1px solid $color;

      li {
        list-style: none;
        font-size: 18px;
        width: 100%;
        text-align: center;
        line-height: 60px;
        border: 1px solid $color;
        border-bottom: 0;
        padding: 0 10px;
        box-sizing: border-box;
        cursor: pointer;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .active {
        background: $color;
        color: $active-color;
      }
    }
  }
</style>
