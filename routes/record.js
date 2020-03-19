const express = require('express')
const router = express.Router()
const Record = require('../models/record')

const { authenticated } = require('../config/auth')

// 顯示新增畫面
router.get('/new', authenticated, (req, res) => {
  res.render('new')
})
// 送出新增資料
router.post('/new', authenticated, (req, res) => {
  const errors = []
  const { name, date, category, amount, merchant } = req.body
  const selection = { [category]: 'on' }
  if (!name || !date || !category || !amount) {
    errors.push({ message: '提醒: 還有*欄位未填入' })
    res.render('new', { name, date, category, amount, selection, errors })
  } else {
    const record = new Record({
      name: name,
      date: date,
      category: category,
      amount: amount,
      userId: req.user._id,
      merchant: merchant
    })
    record.save(err => {
      if (err) return console.error(err)
      // 導回首頁
      return res.redirect('/')
    })
  }
})
// 顯示全部
router.get('/', authenticated, (req, res) => {
  Record.find()
    .lean()
    .exec((err, records) => {
      if (err) console.log(err)
      return res.render('index', { records })
    })
})
// 顯示修改畫面
router.get('/edit/:id', authenticated, (req, res) => {
  Record.findOne({
    _id: req.params.id,
    userId: req.user._id
  })
    .lean()
    .exec((err, record) => {
      if (err) return console.log(err)
      const selection = { [record.category]: 'on' }
      return res.render('edit', { record, selection })
    })
})
// 送出修改資料
router.put('/edit/:id', authenticated, (req, res) => {
  const errors = []
  const { name, date, category, amount, merchant } = req.body
  const selection = { [category]: 'on' }
  if (!name || !date || !category || !amount) {
    errors.push({ message: '提醒: 還有*欄位未填入' })
    res.render('new', {
      name,
      date,
      category,
      amount,
      selection,
      merchant,
      errors
    })
  } else {
    Record.findOne(
      {
        _id: req.params.id,
        userId: req.user._id
      },
      (err, record) => {
        if (err) return console.log(err)
        record.name = req.body.name
        record.date = req.body.date
        record.category = req.body.category
        record.merchant = req.body.merchant
        record.amount = Number(req.body.amount)
        record.save(err => {
          if (err) return console.log(err)
          return res.redirect('/')
        })
      }
    )
  }
})
// 刪除
router.delete('/delete/:id/', authenticated, (req, res) => {
  Record.findOne(
    {
      _id: req.params.id,
      userId: req.user._id
    },
    (err, restaurant) => {
      if (err) return console.error(err)
      restaurant.remove(err => {
        if (err) return console.error(err)
        return res.redirect('/')
      })
    }
  )
})

module.exports = router
