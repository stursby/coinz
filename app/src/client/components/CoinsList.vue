<template>
  <div ref="coins-list">
    <div class="sort-buttons" v-show="showSort">
      <button class="sort" v-for="value in sortByButtons" :key="value" :data-sort="value">
        <span>{{ value }}</span>
      </button>
    </div>
    <div class="list">
      <coin-card v-for="coin in coins" :key="coin.id" :coin="coin" :coins="coins"/>
    </div>
  </div>
</template>

<script>
import List from 'list.js'
import CoinCard from '~/components/CoinCard'

export default {
  props: ['coins', 'show-sort'],

  data() {
    return {
      asc: true,
      list: null,
      sortBy: ['rank', 'name', 'symbol', 'price', 'percent']
    }
  },

  components: {
    CoinCard
  },

  computed: {
    sortByButtons() {
      return this.sortBy.filter(value => value !== 'rank')
    }
  },

  watch: {
    coins(coinsList) {
      if (coinsList.length > 0) {
        this.$nextTick(() => {
          this.initList()
        })
      }
    },

    showSort(showSort) {
      if (!showSort) {
        this.list.sort('rank', { order: 'asc' })
      }
    }
  },

  methods: {
    sort(value) {
      this.list.sort(value, { order: 'asc' })
    },

    percentIndex(coin) {
      return this.coinsByPercentChange.indexOf(coin)
    },

    initList() {
      const options = {
        valueNames: this.sortBy.map(value => {
          return {
            name: value,
            attr: `data-${value}`
          }
        })
      }
      this.list = new List(this.$refs['coins-list'], options)
    }
  }
}
</script>

<style>
.sort-buttons {
  border: 1px solid var(--color-black);
  border-top: 0px;
  position: sticky;
  margin-left: -1px;
  margin-right: -1px;
  margin-top: -20px;
  margin-bottom: 20px;
  top: 70px;
  z-index: 99999;
  display: flex;
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
  overflow: hidden;
}

.sort-buttons button {
  cursor: pointer;
  flex: 1;
  outline: none;
  border: none;
  background: var(--color-slate);
  color: var(--color-white);
  font-size: 11px;
  text-transform: uppercase;
  font-weight: bold;
  text-align: center;
  border-right: 1px solid var(--color-black);
  padding: 10px;
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
}

.sort-buttons button span {
  opacity: 0.5;
}

.sort.asc,
.sort.desc {
  flex: 1.3;
  background: var(--color-slate);
}

.sort.asc span,
.sort.desc span {
  opacity: 1;
}

.sort.asc::before {
  content: '▲ ';
}

.sort.desc::before {
  content: '▼ ';
}

.sort-buttons button:last-child {
  border-right: none;
}
</style>
