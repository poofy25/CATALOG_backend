require('dotenv').config()

const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const watchUploadsFolder = require('./storage/uploadsWatcher')
const logBackendFolder = require('./logFolderPath')

// routes
const adminRoutes = require('./routes/admin')

const app = express()

app.use(cors())
app.use(express.json())
app.use((req, res , next)=>{
    console.log(req.path , req.method)
    next()
})

// routes
app.use('/api/admin' , adminRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{

        // listen for requests
        app.listen(process.env.PORT, ()=>{
            logBackendFolder()
            watchUploadsFolder()
            console.log('Listening on port' , process.env.PORT)
        })

    })
    .catch((error)=>{
        console.log(error)
    })