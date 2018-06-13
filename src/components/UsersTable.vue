<template>
  <table class="UsersTable">
    <tr>
      <th></th>
      <th @click="sortTable('full_name')">Полное имя</th>
      <th @click="sortTable('account')">Учетная запись</th>
      <th @click="sortTable('email')">Электронная почта</th>
      <th @click="sortTable('group')">Группа</th>
      <th @click="sortTable('phone')">Номер телефона</th>
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

<style scoped>
a {
  color: #42b983;
  cursor: pointer;
}
th {
  background-color: #e9f1ef;
  height: 1.5em;
  padding: 0.5em;
}
td {
  text-align: left;
  height: 1.5em;
  padding: 0.5em 1em;
}
</style>
