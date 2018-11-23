let index = 0
const currencies = [...document.querySelectorAll('.currencies li')]
const addresses = [...document.querySelectorAll('.addresses li')]

// function updateAddress(e) {
//   const elIndex = buttons.indexOf(e.target)
//   console.log('lciked', elIndex)
// }

// function resetClasses() {
//   currencies.forEach(c => {
//     if ()
//     c.classList.remove('active')
//   })
//   addresses.forEach(a => {
//     a.classList.remove('active')
//   })
// }

// function setActive(index) {}

currencies.forEach(btn => {
  btn.addEventListener('click', e => {
    currencies[index].classList.remove('active')
    addresses[index].classList.remove('active')
    index = currencies.indexOf(e.target)
    currencies[index].classList.add('active')
    addresses[index].classList.add('active')
  })
})

new Vue({
  el: '#donate',
  data: () => {
    return {
      index: 0,
      currencies: ['BTC', 'ETH', 'LTC'],
      addresses: [
        '1KUAxrzv8v8YC7c2346qknmLB2BcuRRXxR',
        '0xaC537968076Bf96fae05E105cF53B33bBC90Ba4B',
        'ltc1qk938vvngm3mcky9qhxhwqfeye7hx030r2y6gn6'
      ]
    }
  },
  template: `
    <div class="donate">
      <p class="sub">Like this app? Buy me a beer!</p>
      <ul class="currencies">
        <li
          v-for="(currency, currencyIndex) in currencies"
          :class="{ active : index === currencyIndex }"
          :key="currencyIndex"
          @click="index = currencyIndex"
        >
          {{ currency }}
        </li>
      </ul>
      <ul class="addresses">
        <li
          v-for="(address, addressIndex) in addresses"
          :class="{ active : index === addressIndex }"
          :key="addressIndex"
        >
          {{ address }}
        </li>
      </ul>
    </div>
  `
})
