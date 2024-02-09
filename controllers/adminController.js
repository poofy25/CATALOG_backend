const Admin = require('../models/adminModel')
const jwt = require('jsonwebtoken')

require('dotenv').config();
const fs = require('fs');

let folderPath = process.env.UPLOADS_PATH || './storage/uploads';

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

function logFolderContents() {
  fs.readdir(folderPath, (err, files) => {
      if (err) {
          console.error('Error reading folder:', err);
          return;
      }
      console.log('Folder contents:', files);
  });
}

const uploadItem = async (req, res) => {
  console.log('Image uploaded successfully')
   function logFolderContents() {
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error('Error reading folder:', err);
            return;
        }
        console.log('Folder contents:', files);
        res.status(200).json({ message: 'Image uploaded successfully', images: files });
    });
  }
  logFolderContents()
}


module.exports = { signupUser, loginUser, uploadItem }