<template>
  <div class="title-bar">
    <coinz-logo class="logo"/>
    <div class="search-wrapper">
      <search-icon class="search-icon"/>
      <input
        class="search-input"
        type="text" placeholder="Search"
        @keyup="searchKeyup"
      >
    </div>
  </div>
</template>

<script>
import CoinzLogo from '~/components/CoinzLogo'
import SearchIcon from '~/components/SearchIcon'

export default {
  components: {
    CoinzLogo,
    SearchIcon
  },

  model: {
    prop: 'value',
    event: 'change'
  },

  methods: {
    searchKeyup(e) {
      let searchValue = e.target.value
      if (e.key === 'Escape') {
        searchValue = ''
        e.target.value = ''
      }
      this.$emit('change', searchValue)
    }
  }
}
</script>

<style>
.title-bar {
  position: fixed;
  z-index: 3;
  top: 0;
  left: 0;
  height: var(--seach-bar-height);
  width: 100%;
  background: var(--color-slate);
  border-bottom: 1px solid var(--color-black);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 var(--body-gap);
}

.logo {
  margin-right: auto;
  fill: var(--color-gray);
}

.search-wrapper {
  background: var(--color-gray);
  border-radius: 3px;
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: 3px;
}

.search-icon {
  fill: var(--color-black);
  width: 22px;
  margin: 0 4px;
}

.search-input {
  background: var(--color-gray);
  border: none;
  outline: none;
  font-size: 16px;
  height: 28px;
  color: var(--color-black);
  white-space: nowrap;
}

.search-input::placeholder {
  color: var(--color-white);
  opacity: 0.5;
}

.search-input::selection {
  background: var(--color-white);
}
</style>
