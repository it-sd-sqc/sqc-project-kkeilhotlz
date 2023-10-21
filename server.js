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
    const response = await client.query(sql, params)
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

// var mysql = require('mysql');
// var con = mysql.createConnection({
//   host: "localhost",
//   user: "yourusername",
//   password: "yourpassword",
//   database: "mydb"
// });
// con.connect(function(err) {
//   if (err) throw err;
//   con.query("SELECT * FROM customers", function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
//   });
// });

// const queryBook = async function (id) {
//   const sql = `SELECT * from data;`
//   const results = await query(sql, [id])
//   return results.length === 1 ? results[0] : []
// }

const queryBook = async function () {
  const sql = 'SELECT * From data;'
  const results = await query(sql)
  return results
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

  .get('/book', async function (req, res) {
    const data = await queryBook()
    res.render('pages/book', { title: 'Book', data })
  })

  .listen(PORT, () => console.log(`Listening on ${PORT}`))
