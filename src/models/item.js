const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true,
        default: ''
    },
    ingredients: {
        type: String,
        trim: true,
        default: ''
    },
    recipe: {
        type: String,
        trim: true,
        default: ''
    },
    price: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

itemSchema.virtual('orders', {
    ref: 'Order',
    localField: '_id',
    foreignField: 'items.item'
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item