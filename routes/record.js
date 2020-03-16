const express = require('express')
const router = express.Router()
const Record = require('../models/record')

// 顯示新增畫面
router.get('/new', (req, res) => {
  res.render('new')
})
// 送出新增資料
router.post('/new', (req, res) => {
  console.log(req.body)
  const record = new Record({
    name: req.body.name,
    date: req.body.date,
    category: req.body.category,
    amount: req.body.amount
    // , userId: req.user._id
  })
  record.save(err => {
    if (err) return console.error(err)
    // 導回首頁
    return res.redirect('/')
  })
})
// 顯示全部
router.get('/', (req, res) => {
  Record.find()
    .lean()
    .exec((err, records) => {
      if (err) console.log(err)
      return res.render('index', { records })
    })
})
// 顯示修改畫面
router.get('/edit/:id', (req, res) => {
  Record.findOne({
    _id: req.params.id
    // , userId: req.user._id
  })
    .lean()
    .exec((err, record) => {
      if (err) return console.log(err)
      // record.category
      const selection = { [record.category]: 'on' }
      // let date = String(record.date)
      return res.render('edit', { record, selection })
    })
})
// 送出修改資料
router.put('/edit/:id', (req, res) => {
  Record.findOne(
    {
      _id: req.params.id
      // , userId: req.user._id
    },
    (err, record) => {
      if (err) return console.log(err)
      record.name = req.body.name
      record.date = req.body.date
      record.category = req.body.category
      record.amount = Number(req.body.amount)
      record.save(err => {
        if (err) return console.log(err)
        return res.redirect('/')
      })
    }
  )
})

// 刪除
router.delete('/delete/:id/', (req, res) => {
  Record.findOne(
    {
      _id: req.params.id
      // , userId: req.user._id
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
