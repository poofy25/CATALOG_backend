const express = require('express')

const router = express.Router()
const { loginUser , signupUser , uploadItem } = require('../controllers/adminController')

const upload = require('../storage/upload.js')

// login route
router.post('/login' , loginUser)

// signup route
router.post('/signup' , signupUser)

// upload item route
router.post('/upload' , upload.single('image') , uploadItem)


module.exports = router

//catalogadminpassword
//$2b$10$TWPQSL4nG5.ZdgHpJs23tOdBnodvcMx3bWZtIJAOUIiHInR9KowSG