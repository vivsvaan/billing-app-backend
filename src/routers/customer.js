const express = require('express')
const Customer = require('../models/customer')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/customer', auth, async (req, res) => {
    const customer = new Customer(req.body)

    try {
        await customer.save()
        res.status(201).send(customer)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/customers', auth, async (req, res) => {

    try {
        const customers = await Customer.find({}).sort('name')
        res.send(customers)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/customer/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'address', 'email', 'mobile']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const customer = await Customer.findOne({ _id: req.params.id})

        if (!order) {
            return res.status(404).send()
        }

        updates.forEach((update) => customer[update] = req.body[update])
        await customer.save()
        res.send(customer)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/customer/:id', auth, async (req, res) => {
    try {
        const customer = await Customer.findOneAndDelete({ _id: req.params.id })

        if (!customer) {
            res.status(404).send()
        }

        res.send(customer)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router