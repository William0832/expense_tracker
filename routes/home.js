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
        return res.render('index', { records, sum, pickedCategory })
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
        return res.render('index', { records, sum, pickedCategory })
      })
  }
})

module.exports = router
