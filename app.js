require('dotenv').config()
require('express-async-errors')

const { sequelize, User } = require('./models')

//Init express
const express = require('express')
//const user = require('./models/user')
const app = express()

app.use(express.json())

app.use('/api/v1/p', async(req, res) =>{
  const { name, email, role} = req.body
  try{
    const user = await User.create({ name, email, role})
    return res.json(user)
  } catch(error){
    console.log(error) 
  }
})

//Init port & Server
const port = process.env.PORT || 3000

const start = async () =>
{
  try {
    await sequelize.authenticate()
    console.log('DataBase Connected!')
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}`)
    )
  } catch(error) {
    console.log(error)
  }
}

start()