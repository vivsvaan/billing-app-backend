const express = require('express')
const Order = require('../models/order')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/order', auth, async (req, res) => {
    const order = new Order(req.body)

    try {
        await order.save()
        res.status(201).send(order)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/orders', auth, async (req, res) => {

    try {
        const orders = await Order.find({}).sort('-createdAt')
        for (const order of orders) {
           await order.populate('customer').populate('items.item').execPopulate()
        }
        res.send(orders)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/orders/today', auth, async (req, res) => {
    var now = new Date();
    var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    try {
        const orders = await Order.find({createdAt: {$gte: startOfToday}}).sort('-createdAt')
        for (const order of orders) {
           await order.populate('customer').populate('items.item').execPopulate()
        }
        res.send(orders)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/order/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['customer', 'completed', 'items']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const order = await Order.findOne({ _id: req.params.id})

        if (!order) {
            return res.status(404).send()
        }

        updates.forEach((update) => order[update] = req.body[update])
        await order.save()
        res.send(order)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/order/:id', auth, async (req, res) => {
    try {
        const order = await Order.findOneAndDelete({ _id: req.params.id })

        if (!order) {
            res.status(404).send()
        }

        res.send(order)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router