const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    completed: {
        type: Boolean,
        default: false
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Customer'
    },
    items: [{
        item: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Item'
        },
        quantity: {
            type: Number,
            required: true
        }
    }]
}, {
    timestamps: true
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order