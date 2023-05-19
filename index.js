const express = require('express')
const cors = require('cors')
const app = express()
const port= process.env.PORT || 5000

// middleware
app.use(cors())
app.use(express.json())

// root setup 
app.get('/', (req, res) => {
    res.send('Hero Haven Working')
  })


  app.listen(port, () => {
    console.log(`Hero Haven Working on port ${port}`)
  })