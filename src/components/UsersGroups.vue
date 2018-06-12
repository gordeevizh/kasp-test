<template>
  <div class="UsersGroups">
    <UsersGroupsGroup
      class="UsersGroup"
      v-for="usersGroup in nestedUsers"
      :key="usersGroup.id"
      :usersGroup="usersGroup"
    />
  </div>
</template>

<script>
import UsersGroupsGroup from './UsersGroupsGroup'

export default {
  name: 'UsersGroups',
  components: {
    UsersGroupsGroup
  },
  props: {
    users: {
      default: function () {
        return []
      },
      type: Array
    },
    sortState: {
      default () {
        return {}
      }
    }
  },
  data () {
    return {
    }
  },
  computed: {
    sortByGroupUsers () {
      let result = null
      if (this.users) {
        result = this.users.slice().sort(this.compareByGroup)
        if (this.sortState.fieldName === 'group' && this.sortState.reverse) {
          result.reverse()
        }
      }
      return result
    },
    nestedUsers () {
      let groupKey = ''
      let j = -1
      let result = []
      let users = this.sortByGroupUsers
      for (let i = 0; i < (users.length); i++) {
        if (groupKey !== users[i].group) {
          groupKey = users[i].group
          j++
          result[j] = []
        }
        result[j].push(users[i])
      }
      return result
    }
  },
  methods: {
    compareByGroup (a, b) {
      return this.compare(a.group, b.group)
    },
    compare (a, b) {
      if (a === null) { return 1 }
      if (b === null) { return -1 }
      if (a > b) {
        return 1
      }
      if (a < b) {
        return -1
      }
      return 0
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.UsersGroups {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
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
