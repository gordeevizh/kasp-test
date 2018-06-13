<template>
  <div class="mainPage">
    <h1>{{ msg }}</h1>
    <router-link :to="{ name: 'Users'}">Users</router-link>
  </div>
</template>

<script>
export default {
  name: 'KasperskyUsers',
  data () {
    return {
      msg: 'Welcome to Users'
    }
  }
}
</script>

<style scoped>
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
  color: #71b5e5;
}
</style>
