const functions = require('firebase-functions')
const axios = require('axios')

exports.latest = functions.https.onRequest(async (req, res) => {
  const api = axios.create({
    baseURL: 'https://pro-api.coinmarketcap.com/v1',
    headers: {
      'X-CMC_PRO_API_KEY': functions.config().coinmarketcap.key
    }
  })

  const { data } = await api.get('cryptocurrency/listings/latest')
  
  res.set('Cache-Control', 'public, max-age=300, s-maxage=300')
  res.set('Content-Type', 'application/json')
  
  return res.send(data.data)
})
