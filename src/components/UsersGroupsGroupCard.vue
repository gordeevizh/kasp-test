<template>
  <div class="usersGroupsGroupCard">
      <div class="usersGroupsGroupCard__name">{{user.full_name}}</div>
      <div class="usersGroupsGroupCard__group">{{user.group}}</div>
  </div>
</template>

<script>

export default {
  name: 'UsersGroupsGroupCard',
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
.usersGroupsGroupCard {
  padding: 1em;
  border: 1px solid silver;
  margin: 1em;
}
.usersGroupsGroupCard__name {
  font-weight: 600;
}
.usersGroupsGroupCard__group, .usersGroupsGroupCard__name {
  text-align: left;
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
