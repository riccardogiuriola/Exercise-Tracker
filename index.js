const express = require('express')
const { connectToDB } = require('./mongo/db');
const userRouter = require('./routes/users');
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(cors())
app.use(express.static('public'))

connectToDB();

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});
app.use('/api/users', userRouter)

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
