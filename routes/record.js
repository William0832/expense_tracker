const express = require('express')
const router = express.Router()
// const Recod = request('../models/record')

// 顯示新增畫面
router.get('/new', (req, res) => {
  res.render('new')
})
// 送出新增資料
router.post('/', (req, res) => {
  // 由model 處理
  // 存入DB
  res.redirect('/')
})

// 顯示全部
router.get('/', (req, res) => {
  return res.redirect('/')
})
// 顯示修改畫面
router.get('/edit', (req, res) => {
  // 由model 找出對應id 資料並顯示於畫面
  res.render('edit')
})
// 送出修改資料
router.post('/', (req, res) => {
  // 由model 處理
  // 存入DB
  res.redirect('/')
})

// 刪除
router.delete('/:id/delete', (req, res) => {
  res.render('delete')
})

module.exports = router
