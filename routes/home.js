const express = require('express')
const router = express.Router()
const Record = require('../models/record')

router.get('/', (req, res) => {
  const pickedCategory = req.query.category || 'all'
  if (pickedCategory !== 'all') {
    Record.find({
      category: pickedCategory
    })
      .lean()
      .exec((err, records) => {
        if (err) return console.log(err)
        let sum = 0
        records.forEach(record => {
          sum += record.amount
        })
        return res.render('index', { records, sum })
      })
  } else {
    Record.find()
      .lean()
      .exec((err, records) => {
        if (err) return console.log(err)
        let sum = 0
        records.forEach(record => {
          sum += record.amount
        })
        return res.render('index', { records, sum })
      })
  }
})

module.exports = router
