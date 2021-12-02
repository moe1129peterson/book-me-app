require('dotenv').config()
const express = require('express')
const router = express.Router()
const foods = require('../models/index.js')

const dbURI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.sjwng.mongodb.net/foods?retryWrites=true&w=majority`
const mongoose = require('mongoose')
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => { console.log('Connected to DB...') })
.catch((error) => {
    console.error(error)
})

// Get documents by query or get all
router.get('/', async (req, res) => {
    try {
        const results = await Foods.find(req.query)
        if (!results.error) {
            if (results.length > 0) {
                res.status(200).json({
                    success: true, 
                    data: results
                })
            } else {
                res.status(404).json({
                    success: false, 
                    data: results
                })
            }
        } else {
            res.status(400).json({
                success: false, 
                data: results.error
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false, 
            data: error.message
        })
    }
})

// Get document by id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const results = await Foods.findById(id)
        if (!results.error) {
            if (results.length > 0) {
                res.status(200).json({
                    success: true, 
                    data: results
                })
            } else {
                res.status(404).json({
                    success: false, 
                    data: results
                })
            }
        } else {
            res.status(400).json({
                success: false, 
                data: results.error
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false, 
            data: error.message
        })
    }
})

// Create new document
router.post('/', async (req, res) => {
    try {
        const food = new Foods(req.body)
        const newFood = await food.save()
        res.status(200).json({
            success: true, 
            data: newfood
        })
    } catch (error) {
        res.status(500).json({
            success: false, 
            data: error.message
        })
    }
})

// Update record by id
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const food = await Foods.findByIdAndUpdate(id, req.body, { new: true })
        if (!food.error) {
            res.status(200).json({
                success: true, 
                data: food
            })
        } else {
            res.status(400).json({
                success: false, 
                data: food.error
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false, 
            data: error.message
        })
    }
})

// Delete record
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const food = await Foods.findByIdAndRemove(id);
        if (!food.error) {
            res.status(200).json({
                success: true, 
                data: `${id} was successfully deleted`
            })
        } else {
            res.status(400).json({
                success: false, 
                data: food.error
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false, 
            data: error.message
        })
    }
})

module.exports = router