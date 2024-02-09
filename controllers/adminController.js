require('dotenv').config();
const jwt = require('jsonwebtoken')

const Admin = require('../models/adminModel')
const Product = require('../models/productModel')


const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// login a user
const loginUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await Admin.login(email, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// signup a user
const signupUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await Admin.signup(email, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}



const uploadItem = async (req, res) => {
  
  const imageData = req.file

  const { name, description, category, weight, price } = req.body
  const imagePath = ('./' + imageData.path.replace('\\','/')).replace(`\\`,'/')
  console.log(req.body)


  try {
    const product = await Product.createNew({name, description, category, weight, price , imagePath})
    res.status(200).json({ message: 'Image uploaded successfully', product:{...product} });
  } catch (error) {
    res.status(400).json({error: error.message})
  }

  
 
}


module.exports = { signupUser, loginUser, uploadItem }