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
    const response = await client.query(sql, params) // Add 'await' here
    if (response && response.rows) {
      results = response.rows
    }
  } catch (err) {
    console.error(err)
  } finally {
    if (client) client.release()
  }
  return results
}

// Placeholder for queryBook function, replace it with your actual implementation
const queryBook = async function () {
  // Your implementation here
  // For example, you might have a SQL query to fetch book data from the database
  const sql = 'SELECT * FROM data'
  const params = []
  return await query(sql, params)
}

express()
  .use(express.static('public'))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))

  .set('views', 'views')
  .set('view engine', 'ejs')

  .get('/', function (req, res) {
    res.render('pages/index')
  })

  .get('/about', function (req, res) {
    res.render('pages/about', { title: 'About' })
  })

// .get('/book', async function (req, res) {
//   // Call the queryBook function to get book data
//   const book = await queryBook() // Assuming queryBook is a function you've defined elsewhere
//   res.render('pages/book', { title: 'Book Data', book })
// })

  .get('/book', async function (req, res) {
    const data = await query('SELECT * FROM data')
    res.render('pages/book', { data })
  })

  .listen(PORT, () => console.log(`Listening on ${PORT}`))
