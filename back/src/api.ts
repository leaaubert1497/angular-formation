import { Article } from './interfaces/article'

import express from 'express'

const app = express.Router()
const articles: Article[] = [
  {
    id: 'a1',
    name: 'pelle',
    price: 3.99,
    qty: 123,
  },
  {
    id: 'a2',
    name: 'rateau',
    price: 8.99,
    qty: 200,
  },
  {
    id: 'a3',
    name: 'marteau',
    price: 11.99,
    qty: 50,
  },
]

app.get('/date', (req, res) => {
  return res.json({
    date: new Date(),
  })
})

app.get('/articles', (req, res) => {
  return res.json(articles)
})

export default app
