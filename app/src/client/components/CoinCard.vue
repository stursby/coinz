<template>
  <div class="coin-card">
    <img class="sparkline" :src="sparklineURL" :alt="`${coin.name} sparkline`">
    <div class="left rank" :data-rank="coin.cmc_rank">
      <h3 class="name" :data-name="coin.name">{{ coin.name }}</h3>
      <h5 class="symbol" :data-symbol="coin.symbol">{{ coin.symbol }}</h5>
    </div>
    <div class="right">
      <h3 class="price" :data-price="priceIndex">{{ price }}</h3>
      <h5
        class="percent"
        :data-percent="percentIndex"
        :style="percentChangeStyle"
      >{{ percentChange }}%</h5>
    </div>
  </div>
</template>

<script>
export default {
  props: ['coin', 'coins'],

  computed: {
    price() {
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      })
      return formatter.format(this.coin.quote.USD.price)
    },

    percentChange() {
      const percent = this.coin.quote.USD.percent_change_24h.toFixed(2)
      if (Math.sign(percent) > 0) {
        return `+${percent}`
      }
      return percent
    },

    percentChangeStyle() {
      let color = '#EF5753'
      if (this.percentChange.startsWith('+')) {
        color = '#51D88A'
      }
      return {
        color
      }
    },

    sparklineURL() {
      // prettier-ignore
      return `https://s2.coinmarketcap.com/generated/sparklines/web/7d/usd/${this.coin.id}.png`
    },

    percentIndex() {
      return this.coins
        .map(coin => coin.quote.USD.percent_change_24h)
        .sort(function(a, b) {
          return a - b
        })
        .indexOf(this.coin.quote.USD.percent_change_24h)
    },

    priceIndex() {
      return this.coins
        .map(coin => coin.quote.USD.price)
        .sort(function(a, b) {
          return a - b
        })
        .indexOf(this.coin.quote.USD.price)
    }
  }
}
</script>

<style>
.coin-card {
  display: flex;
  background: var(--color-slate);
  padding: 10px 15px;
  margin: 3px 0;
  border-radius: 2px;
  cursor: default;
  position: relative;
}

.sparkline {
  position: absolute;
  top: 8px;
  left: 0;
  opacity: 0.05;
  filter: grayscale(100%);
  pointer-events: none;
  transition: opacity 0.25s ease-in-out;
}

.coin-card:hover > .sparkline {
  opacity: 0.1;
}

.left {
  margin-right: auto;
  max-width: calc(100% - 70px);
  position: relative;
}

.left h3 {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  position: relative;
  z-index: 2;
}

.right {
  text-align: right;
}

h3,
h5 {
  font-weight: 500;
}

h3 {
  font-weight: 700;
}

h5 {
  color: var(--color-gray);
}
</style>
