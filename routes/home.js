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

console.log('monthData', monthData)
router.get('/', authenticated, (req, res) => {
  const pickedCategory = req.query.category || 'all'
  if (pickedCategory !== 'all') {
    Record.find({
      userId: req.user._id,
      category: pickedCategory
    })
      .lean()
      .exec((err, records) => {
        if (err) return console.log(err)
        let sum = 0
        records.forEach(record => {
          sum += record.amount
          record.icon = iconList[record.category]
        })
        return res.render('index', { records, sum, pickedCategory, monthData })
      })
  } else {
    Record.find({ userId: req.user._id })
      .lean()
      .exec((err, records) => {
        if (err) return console.log(err)
        let sum = 0
        records.forEach(record => {
          sum += record.amount
          record.icon = iconList[record.category]
        })
        return res.render('index', { records, sum, pickedCategory, monthData })
      })
  }
})

module.exports = router
