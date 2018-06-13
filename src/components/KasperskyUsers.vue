<template>
  <div class="usersPage">
    <h1>{{ msg }}</h1>
    <div class="usersPage__filters">
      <UsersViewSwitcher
        :viewType="viewType"
        @switchView="switchView"/>
      <UsersSortingSwitcher
        :sortState="sotrState"
        @pleaseSort="sortEndReverseData"
      />
      <BaseInput
        v-model="filter"
        placeholder="Поиск"/>
    </div>
    <component
      :is="viewType"
      :users="filteredFormatedUsersData"
      :sortState="sotrState"
      @sortTable="sortOrReverseData"
      @sortCard="sortOrReverseData"
    ></component>
  </div>
</template>

<script>
import UsersViewSwitcher from './UsersViewSwitcher'
import UsersSortingSwitcher from './UsersSortingSwitcher'
import BaseInput from './BaseInput'
import UsersTable from './UsersTable'
import UsersCards from './UsersCards'
import UsersGroups from './UsersGroups'

import axios from 'axios'
require('es6-promise').polyfill()

export default {
  name: 'KasperskyUsers',
  components: {
    UsersViewSwitcher,
    UsersSortingSwitcher,
    BaseInput,
    UsersTable,
    UsersCards,
    UsersGroups
  },
  data () {
    return {
      msg: 'Users',
      usersData: null,
      fieldName: '',
      reverse: false,
      filter: '',
      viewType: 'UsersTable'
    }
  },
  created () {
    this.loadData()
  },
  watch: {
    '$route': 'loadData'
  },
  computed: {
    formatedUsersData () {
      let self = this
      if (self.usersData) {
        return self.usersData.map(function (user) {
          return {
            'id': user.id,
            'full_name': self.getFullName(user),
            'account': user.account,
            'email': user.email,
            'group': user.group || 'Unmanaged',
            'phone': user.phone
          }
        })
      }
      return null
    },
    filteredFormatedUsersData () {
      if (this.formatedUsersData) {
        return this.formatedUsersData.filter(this.searchFilter)
      }
      return null
    },
    sotrState () {
      return {
        fieldName: this.fieldName,
        reverse: this.reverse
      }
    }
  },
  methods: {
    loadData () {
      let self = this
      axios.get('https://my.api.mockaroo.com/users.json?key=dbab6640')
        .then(function (response) {
          self.usersData = response.data
          console.log(self.usersData)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    getFullName (user) {
      return user.last_name + ' ' + user.first_name
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
    },
    searchFilter (user) {
      let filter = this.filter.toLowerCase()
      let result = false
      for (let field in user) {
        if (!user.hasOwnProperty(field)) continue
        if (user[field].toString().toLowerCase().includes(filter)) {
          result = true
          break
        }
      }
      return result
    },
    compareByFullName (a, b) {
      a.full_name = this.getFullName(a)
      b.full_name = this.getFullName(b)
      return this.compare(a.full_name, b.full_name)
    },
    compareByAccount (a, b) {
      return this.compare(a.account, b.account)
    },
    compareByGroup (a, b) {
      return this.compare(a.group, b.group)
    },
    compareByEmail (a, b) {
      return this.compare(a.email, b.email)
    },
    compareByPhone (a, b) {
      return this.compare(a.phone, b.phone)
    },
    sortData (field) {
      switch (field) {
        case 'full_name':
          this.usersData.sort(this.compareByFullName)
          break
        case 'account':
          this.usersData.sort(this.compareByAccount)
          break
        case 'group':
          this.usersData.sort(this.compareByGroup)
          break
        case 'email':
          this.usersData.sort(this.compareByEmail)
          break
        case 'phone':
          this.usersData.sort(this.compareByPhone)
          break
      }
      this.fieldName = field
      this.reverse = false
    },
    sortOrReverseData (field) {
      if (this.fieldName === field) {
        this.reverseData()
      } else {
        this.sortData(field)
      }
    },
    sortEndReverseData (sortObj) {
      this.sortData(sortObj.fieldName)
      if (sortObj.reverse) this.reverseData()
    },
    reverseData () {
      this.usersData.reverse()
      this.reverse = !this.reverse
    },
    switchView (switchTo) {
      this.viewType = switchTo
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.usersPage__filters {
  display: flex;
  margin-bottom: 2em;
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
