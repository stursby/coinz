<template>
  <div>
    <coin-card
      v-for="coin in coins"
      :key="coin.id"
      :coin="coin"
    />
  </div>
</template>

<script>
import CoinCard from '~/components/CoinCard'

export default {
  props: ['coins'],

  components: {
    CoinCard
  }
}
</script>

