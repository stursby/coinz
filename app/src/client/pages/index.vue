<template>
  <div>
    <title-bar v-model="search" :toggleSort="toggleSort"/>
    <coins-list :coins="coins" :show-sort="showSort"/>
    <p class="no-results" v-if="noSearchResults">
      No results found for “
      <b>{{ search }}</b>”
    </p>
  </div>
</template>

<script>
import axios from 'axios'
import Fuse from 'fuse.js'
import { ipcRenderer } from 'electron'
import TitleBar from '~/components/TitleBar'
import CoinsList from '~/components/CoinsList'

const fustOptions = {
  shouldSort: true,
  threshold: 0.1,
  keys: ['name', 'symbol', 'slug']
}

export default {
  components: {
    TitleBar,
    CoinsList
  },

  data() {
    return {
      latest: [],
      search: '',
      showSort: false
    }
  },

  mounted() {
    this.fetchLatest()

    setTimeout(() => {
      this.fetchLatest()
    }, 10000)

    ipcRenderer.on('cron', () => {
      this.fetchLatest()
    })
  },

  computed: {
    coins() {
      if (this.search) {
        const fuse = new Fuse(this.latest, fustOptions)
        const results = fuse.search(this.search)
        return results
      }
      return this.latest
    },

    noSearchResults() {
      return this.search && !this.coins.length
    }
  },

  methods: {
    fetchLatest() {
      axios.get('https://coinz-app.firebaseapp.com/api/latest').then(res => {
        this.latest = res.data
      })
    },

    toggleSort() {
      this.showSort = !this.showSort
    }
  }
}
</script>
