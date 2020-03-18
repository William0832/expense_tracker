const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Record = require('../record')
const User = require('../user')
const usersData = [
  {
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678',
    totalAmount: 0
  },
  {
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678',
    totalAmount: 0
  }
]
const recordsData = [
  {
    name: '早餐',
    category: 'food',
    amount: 60,
    date: '2020-03-02',
    merchant: '7-11'
  },
  {
    name: '午餐',
    category: 'food',
    amount: 120,
    date: '2020-03-02',
    merchant: '麥當勞'
  },
  {
    name: '晚餐',
    category: 'food',
    amount: 150,
    date: '2020-03-04',
    merchant: '巷口牛肉麵'
  },
  {
    name: '書',
    category: 'entertainment',
    amount: 300,
    date: '2020-03-10',
    merchant: '誠品'
  },
  {
    name: '加油:汽車',
    category: 'transportation',
    amount: 1000,
    date: '2020-03-10',
    merchant: '中油'
  },
  {
    name: '捷運',
    category: 'transportation',
    amount: 90,
    date: '2020-03-15',
    merchant: '北捷'
  },
  {
    name: '電影',
    category: 'entertainment',
    amount: 300,
    date: '2020-03-11',
    merchant: '威秀'
  },
  {
    name: '演唱會',
    category: 'entertainment',
    amount: 3000,
    date: '2020-03-11',
    merchant: 'John_Mayer'
  },
  {
    name: '租金',
    category: 'housing',
    amount: 10000,
    date: '2020-03-15',
    merchant: '房東'
  }
]

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/record', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const db = mongoose.connection

db.on('error', () => {
  console.log('db error')
})

db.once('open', () => {
  console.log('db connected!')
  // add users in DB
  const users = []
  usersData.forEach(user => {
    users.push(new User(user))
  })
  // add record in DB
  recordsData.forEach(record => {
    // rendon select related user
    let index = Math.floor(Math.random() * usersData.length)
    // count totalAmount
    usersData[index].totalAmount += record.amount
    record.userId = users[index]._id
    Record.create(record)
  })

  // update totalAmount & add hash password in User
  let index = 0
  users.forEach(newUser => {
    // update totalAmount
    newUser.totalAmount = usersData[index].totalAmount
    // create hash
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return console.log(err)
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) return console.log(err)
        newUser.password = hash
        newUser.save(err => {
          if (err) return console.log(err)
        })
      })
    })
    index += 1
  })
  console.log('Adding sample is done')
})
