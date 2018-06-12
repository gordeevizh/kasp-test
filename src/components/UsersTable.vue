<template>
  <table class="UsersTable">
    <tr>
      <td></td>
      <td @click="sortTable('full_name')">Полное имя</td>
      <td @click="sortTable('account')">Учетная запись</td>
      <td @click="sortTable('email')">Электронная почта</td>
      <td @click="sortTable('group')">Группа</td>
      <td @click="sortTable('phone')">Номер телефона</td>
    </tr>
    <tr
      v-for="user in users"
      :key="user.id"
      >
      <td></td>
      <td>{{user.full_name}}</td>
      <td>{{user.account}}</td>
      <td>{{user.email}}</td>
      <td>{{user.group}}</td>
      <td>{{user.phone}}</td>
    </tr>
  </table>
</template>

<script>

export default {
  name: 'UsersTable',
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
    sortTable (byField) {
      this.$emit('sortTable', byField)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
  color: #42b983;
}
td {
  text-align: left;
}
</style>
