<template>
  <div class="UsersGroupsGroup">
      <UsersGroupsGroupCard
        v-for="user in usersGroup"
        :key="user.id"
        :user="user"
      />
  </div>
</template>

<script>
import UsersGroupsGroupCard from './UsersGroupsGroupCard'

export default {
  name: 'UsersGroupsGroup',
  components: {
    UsersGroupsGroupCard
  },
  props: {
    usersGroup: {
      default: function () {
        return {}
      },
      type: Array
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
.UsersGroupsGroup {
    margin: 1em;
    width: 300px;
    background: gray;
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
