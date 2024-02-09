const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')


const Schema = mongoose.Schema

const adminSchema = new Schema ({
    email: {
        type: String,
        required:true,
        unique: true
    },
    password: {
        type:String,
        required: true
    }
})

adminSchema.statics.signup = async function(email, password) {

    // validation
    if(!email || !password) {
        throw Error('All fields must be filled')
    }

    const exists = await this.findOne({ email }) 

    if (exists){
        throw Error("Email already in use")
    }

    const salt = await bcrypt.genSaltSync(10)
    const hash = await bcrypt.hash(password , salt)

    const User = await this.create({ email, password: hash })

    return User

}

adminSchema.statics.login = async function(email, password) {
    if(!email || !password) {
        throw Error ('All fields must be filled')
    }

    const user = await this.findOne({ email })

    if( !user ) {
        throw Error ('Incorrent Email')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match){
        throw Error('Incorrent password')
    }

    return user

}

module.exports = mongoose.model('Admin', adminSchema)