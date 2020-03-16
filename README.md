# [Expense Tracker](https://hidden-castle-57560.herokuapp.com/users/login)

記帳本WEB APP

## Requirement

[Node.js](https://nodejs.org/en/)  
[mongodb](https://www.mongodb.com/)

## Packages
[nodemon](https://www.npmjs.com/package/nodemon)
[express](https://expressjs.com/)  
[express-handlebars](https://www.npmjs.com/package/express-handlebars)  
[body-parser](https://www.npmjs.com/package/body-parser)  
[method-override](https://www.npmjs.com/package/method-override)  
[mongoose](https://mongoosejs.com/)  
[express-session](https://www.npmjs.com/package/express-session)  
[passport](http://www.passportjs.org/)  
[passport-local](http://www.passportjs.org/packages/passport-local/)  
[passport-facebook](http://www.passportjs.org/packages/passport-facebook/)  
[bcryptjs](https://www.npmjs.com/package/bcryptjs)  
[connect-flash](https://www.npmjs.com/package/connect-flash)  
[dotenv](https://www.npmjs.com/package/dotenv)

## 功能表

1) 在首頁一次瀏覽所有支出的清單
2) 在首頁看到所有支出清單的總金額
3) 新增一筆支出
4) 編輯支出的所有屬性 (一次只能編輯一筆)
5) 刪除任何一筆支出 (一次只能刪除一筆)
6) 在首頁可以根據支出「類別」篩選支出；總金額的計算只會包括被篩選出來的支出總和
7) 透過 email 跟秘密註冊與登入，並只能看到自己建立的支出（使用者必需登入才可以使用這個 app 或看到資料）
8) 在註冊時輸入使用者名稱、email 與 password，所有都是必填欄位
9) 透過 Facebook 帳號登入

## 安裝操作

1. **下載專案**

```
git clone https://github.com/William0832/expense_tracker.git
```

2. **由 Terminal 進入專案資料夾**

```
cd expense_tracker
```

3. **安裝專案需求套件**

```
npm install
```

4. **新增 Database**

```
node ./models/seeds/seeder.js
```

5. **執行專案**

```
npm run dev
```

6. **檢視 Terminal 訊息：**

**App is listening on [localhost:3000](http://localhost:3000)**

**db connected!**

7. **測試用帳號:**

| Name  |             Email              | Password |
| :---: | :----------------------------: | :------: |
| user1 | user1<span>@example.com</span> | 12345678 |
| user2 | user2<span>@example.com</span> | 12345678 |
