const express = require('express');
const cors = require('cors');
const moment = require('moment');
const bodyparser = require('body-parser');
const asyncHandler = require('./utils/asyncHandler')
const { Client } = require('pg')

const app = express();
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'rfid',
  password: '11',
  port: 5432,
})
const PORT = 3000;

app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors())

app.get('/:id', asyncHandler(async (req, res) => {
  const id = req.params.id

  const data = await client.query(`SELECT * from student where id = ${id}`)

  if (data.rows.length !== 1) {
    throw new Error('Student not found')
  }

  const date = Date.now()

  const response = await client.query(`insert into entry(student_id, date, hour) values(${id}, '${moment(date).format("YYYY-MM-DD")}', '${moment(date).format("hh:mm:ss")}')`)

  if (response.rowCount !== 1) {
    throw new Error('Error registing')
  }

  res.json({ ok: true, message: 'Welcome student' })
}))



app.use((req, res, next) => {
  const err = Error('Not found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.code || 400);
  res.send({ ok: false, err: err.message });
});

app.listen(PORT, async () => {
  console.log('server running')

  await client.connect()
})
