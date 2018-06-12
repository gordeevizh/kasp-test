<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
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
    this.fakeLoadData()
  },
  watch: {
    '$route': 'fakeLoadData'
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
    },
    fakeLoadData () {
      this.usersData = [
        {"id":1,"first_name":"Lorettalorna","last_name":"Wolseley","account":"companyname/lorettalornawolseley","email":"lwolseley0@miibeian.gov.cn","group":"Services","phone":"+62 (288) 104-9077"},
        {"id":2,"first_name":"Claire","last_name":"Bayford","account":"companyname/clairebayford","email":"cbayford1@nymag.com","group":null,"phone":"+976 (774) 684-8890"},
        {"id":3,"first_name":"Rosina","last_name":"McMechan","account":"companyname/rosinamcmechan","email":"rmcmechan2@sitemeter.com","group":"Training","phone":"+30 (270) 654-0671"},
        {"id":4,"first_name":"Sim","last_name":"Merit","account":"companyname/simmerit","email":"smerit3@bloomberg.com","group":"Accounting","phone":"+86 (532) 540-9420"},
        {"id":5,"first_name":"Drugi","last_name":"Fidele","account":"companyname/drugifidele","email":"dfidele4@wikimedia.org","group":"Support","phone":"+7 (739) 920-5623"},
        {"id":6,"first_name":"Reade","last_name":"Kuzemka","account":"companyname/readekuzemka","email":"rkuzemka5@twitpic.com","group":"Marketing","phone":"+60 (940) 796-3157"},
        {"id":7,"first_name":"Briano","last_name":"Jacks","account":"companyname/brianojacks","email":"bjacks6@addthis.com","group":"Product Management","phone":"+86 (573) 833-5296"},
        {"id":8,"first_name":"Pippo","last_name":"Dyne","account":"companyname/pippodyne","email":"pdyne7@aboutads.info","group":"Training","phone":"+63 (519) 825-9421"},
        {"id":9,"first_name":"Amelita","last_name":"Meadmore","account":"companyname/amelitameadmore","email":"ameadmore8@theguardian.com","group":"Marketing","phone":"+63 (725) 449-9283"},
        {"id":10,"first_name":"Haily","last_name":"Nutt","account":"companyname/hailynutt","email":"hnutt9@hatena.ne.jp","group":"Business Development","phone":"+86 (609) 410-1243"},
        {"id":11,"first_name":"Jody","last_name":"Sadat","account":"companyname/jodysadat","email":"jsadata@archive.org","group":"Marketing","phone":"+33 (428) 885-1230"},
        {"id":12,"first_name":"Sayre","last_name":"Domingues","account":"companyname/sayredomingues","email":"sdominguesb@wufoo.com","group":"Research and Development","phone":"+62 (749) 601-1280"},
        {"id":13,"first_name":"Goran","last_name":"Boughtwood","account":"companyname/goranboughtwood","email":"gboughtwoodc@examiner.com","group":null,"phone":"+51 (944) 857-9021"},
        {"id":14,"first_name":"Lorraine","last_name":"Lotherington","account":"companyname/lorrainelotherington","email":"llotheringtond@epa.gov","group":"Business Development","phone":"+241 (957) 476-0852"},
        {"id":15,"first_name":"Towny","last_name":"Iowarch","account":"companyname/townyiowarch","email":"tiowarche@last.fm","group":null,"phone":"+86 (498) 286-6662"},
        {"id":16,"first_name":"Emmy","last_name":"Schofield","account":"companyname/emmyschofield","email":"eschofieldf@tinypic.com","group":"Marketing","phone":"+62 (356) 722-0166"},
        {"id":17,"first_name":"Townsend","last_name":"Budgen","account":"companyname/townsendbudgen","email":"tbudgeng@barnesandnoble.com","group":"Engineering","phone":"+353 (369) 569-1785"},
        {"id":18,"first_name":"Constantin","last_name":"Altree","account":"companyname/constantinaltree","email":"caltreeh@so-net.ne.jp","group":"Product Management","phone":"+86 (710) 673-0505"},
        {"id":19,"first_name":"Kelvin","last_name":"Blyden","account":"companyname/kelvinblyden","email":"kblydeni@sitemeter.com","group":"Accounting","phone":"+380 (554) 481-9346"},
        {"id":20,"first_name":"Marjy","last_name":"Gumb","account":"companyname/marjygumb","email":"mgumbj@soundcloud.com","group":null,"phone":"+45 (250) 365-0540"},
        {"id":21,"first_name":"Nannette","last_name":"Soans","account":"companyname/nannettesoans","email":"nsoansk@nbcnews.com","group":"Accounting","phone":"+596 (396) 576-4602"},
        {"id":22,"first_name":"Bartholomeo","last_name":"Northcote","account":"companyname/bartholomeonorthcote","email":"bnorthcotel@weibo.com","group":"Research and Development","phone":"+86 (279) 439-1426"},
        {"id":23,"first_name":"Dallas","last_name":"Strettell","account":"companyname/dallasstrettell","email":"dstrettellm@g.co","group":null,"phone":"+62 (970) 969-4171"},
        {"id":24,"first_name":"Layla","last_name":"Loghan","account":"companyname/laylaloghan","email":"lloghann@mysql.com","group":"Support","phone":"+81 (504) 328-5905"},
        {"id":25,"first_name":"Richy","last_name":"Shrubsall","account":"companyname/richyshrubsall","email":"rshrubsallo@google.pl","group":"Support","phone":"+86 (765) 787-4754"},
        {"id":26,"first_name":"Timothy","last_name":"McCaw","account":"companyname/timothymccaw","email":"tmccawp@cargocollective.com","group":null,"phone":"+63 (127) 110-0982"},
        {"id":27,"first_name":"Friedrich","last_name":"Baudouin","account":"companyname/friedrichbaudouin","email":"fbaudouinq@google.com.hk","group":"Support","phone":"+62 (862) 907-5587"},
        {"id":28,"first_name":"Raphaela","last_name":"Rives","account":"companyname/raphaelarives","email":"rrivesr@skype.com","group":null,"phone":"+86 (319) 712-6871"},
        {"id":29,"first_name":"Anett","last_name":"Blaisdale","account":"companyname/anettblaisdale","email":"ablaisdales@lulu.com","group":"Training","phone":"+52 (830) 106-2563"},
        {"id":30,"first_name":"Alastair","last_name":"Mears","account":"companyname/alastairmears","email":"amearst@wikia.com","group":null,"phone":"+351 (123) 361-2492"},
        {"id":31,"first_name":"Billy","last_name":"Garwood","account":"companyname/billygarwood","email":"bgarwoodu@diigo.com","group":"Services","phone":"+86 (592) 974-9571"},
        {"id":32,"first_name":"Candie","last_name":"Shipperbottom","account":"companyname/candieshipperbottom","email":"cshipperbottomv@baidu.com","group":"Product Management","phone":"+7 (765) 981-8181"},
        {"id":33,"first_name":"Malory","last_name":"Texton","account":"companyname/malorytexton","email":"mtextonw@google.com","group":"Sales","phone":"+251 (560) 399-4964"},
        {"id":34,"first_name":"Alex","last_name":"Goadsby","account":"companyname/alexgoadsby","email":"agoadsbyx@symantec.com","group":null,"phone":"+86 (480) 774-9554"},
        {"id":35,"first_name":"Madelle","last_name":"Glazebrook","account":"companyname/madelleglazebrook","email":"mglazebrooky@nih.gov","group":null,"phone":"+48 (398) 638-4481"},
        {"id":36,"first_name":"Polly","last_name":"Gillfillan","account":"companyname/pollygillfillan","email":"pgillfillanz@time.com","group":"Legal","phone":"+81 (306) 350-1867"},
        {"id":37,"first_name":"Falito","last_name":"Spread","account":"companyname/falitospread","email":"fspread10@usda.gov","group":null,"phone":"+62 (899) 691-2169"},
        {"id":38,"first_name":"Harlen","last_name":"Neesham","account":"companyname/harlenneesham","email":"hneesham11@dmoz.org","group":"Support","phone":"+63 (620) 123-4507"},
        {"id":39,"first_name":"Ginger","last_name":"Aitkin","account":"companyname/gingeraitkin","email":"gaitkin12@ihg.com","group":"Marketing","phone":"+86 (397) 520-8335"},
        {"id":40,"first_name":"Hoyt","last_name":"Burrel","account":"companyname/hoytburrel","email":"hburrel13@reverbnation.com","group":null,"phone":"+86 (938) 484-7711"}
      ]
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
</style>
