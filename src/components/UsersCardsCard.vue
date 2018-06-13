<template>
  <div class="usersCardsCard">
      <div class="usersCardsCard__name">{{user.full_name}}</div>
      <div class="usersCardsCard__avatar"></div>
      <div class="usersCardsCard__group">{{user.group}}</div>
      <div class="usersCardsCard__phone">{{user.phone}}</div>
  </div>
</template>

<script>

export default {
  name: 'UsersCardsCard',
  props: {
    user: {
      default: function () {
        return {}
      },
      type: Object
    }
  },
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.usersCardsCard {
  background-color: #f5f5f5;
  padding: 1em;
  margin: 1em;
  width: 250px;
}
.usersCardsCard__name {
  font-weight: 600;
}
.usersCardsCard__avatar {
  background: url('../assets/userAvatarDevault.png');
  width: 165px;
  height: 142px;
  margin: auto;
}
.usersCardsCard__group, .usersCardsCard__phone, .usersCardsCard__name {
  line-height: 2em;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
