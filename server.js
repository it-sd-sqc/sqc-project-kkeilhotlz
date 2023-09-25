// Dependencies ////////////////////////////////////////////
import 'dotenv/config'
import express from 'express'
import pkg from 'pg'
const { Pool } = pkg

// Configuration ///////////////////////////////////////////
const PORT = process.env.PORT || 5163
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

export const query = async function (sql, params) {
  let client
  let results = []
  try {
    client = await pool.connect()
    const response = client.query(sql, params)
    if (response && response.rows) {
      results = response.rows
    }
  } catch (err) {
    console.error(err)
  }
  if (client) client.release()
  return results
}

express()
  .use(express.static('public'))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))

  .set('views', 'views')
  .set('view engine', 'ejs')
.get('/', function (req, res) {
  res.render('pages/index', {title: 'Home'})
})

.get('/about', function (req, res) {
  res.render('pages/about', { title: 'About' })
})

.get('/book', function (req, res) {
  res.render('pages/book', { title: 'Book' })
})

.get('/book', async function (req, res) {
  const book = await queryBook()
  res.render('pages/book', { title: 'Book Data' , book })
})

.listen(PORT, () => console.log(`Listening on ${PORT}`))


// const app = express()

// app.use(express.static('./public'))

// const displayPort = function () {
//   console.log('Listening on ' + PORT)
// }

// app.listen(PORT, displayPort)