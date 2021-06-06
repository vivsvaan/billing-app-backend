const mongoose = require('mongoose')
const validator = require('validator')
const Order = require('./order')

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        default: '',
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: false,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    mobile: {
        type: Number,
        required: true,
        unique: true
    }
}, {
    timestamps: true
})

customerSchema.virtual('orders', {
    ref: 'Order',
    localField: '_id',
    foreignField: 'customer'
})

// Delete customer orders when customer is removed
customerSchema.pre('remove', async function (next) {
    const customer = this
    await Order.deleteMany({ customer: customer._id })
    next()
})

const Customer = mongoose.model('Customer', customerSchema)

module.exports = Customer