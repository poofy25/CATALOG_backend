const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema ({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    weight:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    imagePath:{
        type:String,
        required:true,
        unique:true
    }

},{timestamps:true})

productSchema.statics.createNew = async function({name, description, category, weight, price, imagePath}) {
    console.log('Working')
    // validation
    if(!name || !description || !category || !weight || !price || !imagePath) {
        throw Error('All fields must be filled')
    }

    const exists = await this.findOne({ name }) 
    console.log(exists)
    if (exists){
        throw Error("Product already exists")
    }

    const Product = await this.create({name, description, category, weight, price, imagePath})
    console.log(Product)
    return Product

}



module.exports = mongoose.model('Product', productSchema)
