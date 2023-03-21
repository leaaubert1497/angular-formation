import express from 'express'

const app = express.Router()

app.get('/date', (req, res) => {
  return res.json({
    date: new Date(),
  })
})

export default app
