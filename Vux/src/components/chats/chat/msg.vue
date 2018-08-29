<template>
    <li>
      <div class="avatar"></div>
      <div>
        <span class="username">Vinci</span>
        <div class="content">balabala</div>
      </div>
    </li>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
  li {
    display: flex;
    margin: 15px;

    .avatar {
      margin-right: 8px;
      width: 50px;
      height: 50px;
      background-color: orangered;
    }

    .username {
      font-size: 12px;
      color: #999;
    }

    .content {
      position: relative;
      padding: 10px;
      border-radius: 4px;
      border: 1px solid #ddd;
      background-color: #fff;

      &:before,
      &:after {
        position: absolute;
        content: '';
        display: block;
        width: 0;
        height: 0;
        border-style: solid;
      }

      &:before {
        z-index: 1;
        left: -10px;
        top: 10px;
        border-width: 5px;
        border-color: transparent #fff transparent transparent;
      }

      &:after {
        left: -12px;
        top: 9px;
        border-width: 6px;
        border-color: transparent #ddd transparent transparent;
      }
    }
  }
</style>
