const express = require('express')
const router = express.Router()
const Record = require('../models/record')

const { authenticated } = require('../config/auth')
const iconList = {
  housing: 'fas fa-home',
  transportation: 'fas fa-shuttle-van',
  food: 'fas fa-utensils',
  entertainment: 'fas fa-grin-beam',
  others: 'fas fa-pen'
}
const monthData = [
  {
    index: 0,
    name: 'ALL'
  },
  {
    index: 1,
    name: 'JAN'
  },
  {
    index: 2,
    name: 'FEB'
  },
  {
    index: 3,
    name: 'MAR'
  },
  {
    index: 4,
    name: 'APR'
  },
  {
    index: 5,
    name: 'MAY'
  },
  {
    index: 6,
    name: 'JUN'
  },
  {
    index: 7,
    name: 'JUL'
  },
  {
    index: 8,
    name: 'AUG'
  },
  {
    index: 9,
    name: 'SEP'
  },
  {
    index: 10,
    name: 'OCT'
  },
  {
    index: 11,
    name: 'NOV'
  },
  {
    index: 12,
    name: 'DEC'
  }
]
const categoryData = [
  { index: 0, name: 'all' },
  { index: 1, name: 'housing' },
  { index: 2, name: 'entertainment' },
  { index: 3, name: 'food' },
  { index: 4, name: 'transportation' },
  { index: 5, name: 'others' }
]

router.get('/', authenticated, (req, res) => {
  const user = req.user
  const userName = user.name
  console.log('query:', req.query)
  let { month, category } = req.query
  const condition = { userId: req.user._id }
  const year = new Date().getFullYear()
  if (category) {
    condition.category = category
  }
  if (category === 'all') {
    delete condition.category
  }

  if (month && month !== 0) {
    if (month.length === 1) {
      month = '0' + month
    }
    condition.date = {
      $gte: `${year}-${month}-01`,
      $lte: `${year}-${month}-31`
    }
  }
  if (month === '0') {
    delete condition.date
  }
  Record.find(condition)
    .lean()
    .exec((err, records) => {
      if (err) return console.log(err)
      let sum = 0
      records.forEach(record => {
        sum += record.amount
        record.icon = iconList[record.category]
      })

      return res.render('index', {
        userName,
        records,
        sum,
        category,
        monthData,
        categoryData,
        month
      })
    })
})
module.exports = router
