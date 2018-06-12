<template>
  <div class="UsersCards">
    <UsersCardsCard
      v-for="user in users"
      :key="user.id"
      :user="user"
    />
  </div>
</template>

<script>
import UsersCardsCard from './UsersCardsCard'

export default {
  name: 'UsersCards',
  components: {
    UsersCardsCard
  },
  props: {
    users: {
      default: function () {
        return []
      },
      type: Array
    }
  },
  data () {
    return {
    }
  },
  methods: {
    sortCard (byField) {
      this.$emit('sortCard', byField)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.UsersCards {
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
