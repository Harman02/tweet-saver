const router = require('express').Router()
const Twit = require('twit')
 
const client = new Twit({
  consumer_key:         '9IMEDtC2F10hF3MdbSXOrTWpi',
  consumer_secret:      'lH7nUQiCkxF4XQWPfHfD2A7P90eLTAByLTPGkQupmxx3ibNZny',
  access_token:         '1485120332818104322-ucAdgqlLQgzArq9rrR6HA56e9AxdiW',
  access_token_secret:  'AUDZW77CdDTU2UZg0p4tLLe80uLctV38Q5qDft5dsLunv',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
})

// To get search results...
router.get('/search', async (req, res, next) => {
  try {
    const q = req?.query?.q;
    const data = await client.get('/search/tweets', { q: q , count: 10 });
    res.send(data);
  } 
  catch (error) {
    console.log(error.message)
    next(error.message)
  }
})

module.exports = router