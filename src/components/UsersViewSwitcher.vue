<template>
  <div
    class="UsersViewSwitcher"
    @click="switchView"
  >{{label}}</div>
</template>

<script>

export default {
  name: 'UsersViewSwitcher',
  props: {
    viewType: {
      default: 'UsersTable',
      type: String
    }
  },
  data () {
    return {
    }
  },
  computed: {
    label () {
      switch (this.viewType) {
        case 'UsersTable': return 'Таблица'
        case 'UsersCards': return 'Список карточек'
        case 'UsersGroups': return 'По группам'
      }
      return ''
    }
  },
  methods: {
    switchView () {
      let viewType = this.viewType
      let switchTo = ''

      if (viewType === 'UsersTable') {
        switchTo = 'UsersCards'
      } else if (viewType === 'UsersCards') {
        switchTo = 'UsersGroups'
      } else if (viewType === 'UsersGroups') {
        switchTo = 'UsersTable'
      }

      this.$emit('switchView', switchTo)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.UsersViewSwitcher {
  cursor: pointer;
  display: block;
  width: 200px;
  height: 3em;
  background: #e9f1ef;
  line-height: 3em;

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
