<template>
  <div class="userSortingSwitcher">
    <div>Отсортировать</div>
    <select
      name="select"
      :value=value
      @input="pleaseSort($event.target.value)"
    >
      <option value="1">По имени по возрастанию</option>
      <option value="2">По имени по убыванию</option>
      <option value="3">По учетной записи по возрастанию</option>
      <option value="4">По учетной записи по убыванию</option>
      <option value="5">По электронной почте по возрастанию</option>
      <option value="6">По электронной почте по убыванию</option>
      <option value="7">По группе по возрастанию</option>
      <option value="8">По группе по убыванию</option>
      <option value="9">По телефону по возрастанию</option>
      <option value="10">По телефону по убыванию</option>
    </select>
  </div>
</template>

<script>

export default {
  name: 'UserSortingSwitcher',
  props: {
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
    value () {
      switch (this.sortState.fieldName) {
        case 'full_name':
          return this.sortState.reverse ? 2 : 1
        case 'account':
          return this.sortState.reverse ? 4 : 3
        case 'email':
          return this.sortState.reverse ? 6 : 5
        case 'group':
          return this.sortState.reverse ? 8 : 7
        case 'phone':
          return this.sortState.reverse ? 10 : 9
      }
    }
  },
  methods: {
    pleaseSort (value) {
      let result = {fieldName: '', reverse: false}
      switch (value) {
        case '1':
          result.fieldName = 'full_name'
          result.reverse = false
          break
        case '2':
          result.fieldName = 'full_name'
          result.reverse = true
          break
        case '3':
          result.fieldName = 'account'
          result.reverse = false
          break
        case '4':
          result.fieldName = 'account'
          result.reverse = true
          break
        case '5':
          result.fieldName = 'email'
          result.reverse = false
          break
        case '6':
          result.fieldName = 'email'
          result.reverse = true
          break
        case '7':
          result.fieldName = 'group'
          result.reverse = false
          break
        case '8':
          result.fieldName = 'group'
          result.reverse = true
          break
        case '9':
          result.fieldName = 'phone'
          result.reverse = false
          break
        case '10':
          result.fieldName = 'phone'
          result.reverse = true
          break
      }
      this.$emit('pleaseSort', result)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.userSortingSwitcher {
  padding: 0 1em;
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
