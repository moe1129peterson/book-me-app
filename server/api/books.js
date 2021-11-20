require('dotenv').config()
const express = require('express')
const router = express.Router()
const Books = require('../models/index.js')

const dbURI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.sjwng.mongodb.net/books?retryWrites=true&w=majority`
const mongoose = require('mongoose')
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => { console.log('Connected to DB...') })
.catch((error) => {
    console.error(error)
})

// Get documents by query or get all
router.get('/', async (req, res) => {
    try {
        const results = await Books.find(req.query)
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
        const results = await Books.findById(id)
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
        const book = new Books(req.body)
        const newBook = await book.save()
        res.status(200).json({
            success: true, 
            data: newBook
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
        const book = await Books.findByIdAndUpdate(id, req.body, { new: true })
        if (!book.error) {
            res.status(200).json({
                success: true, 
                data: book
            })
        } else {
            res.status(400).json({
                success: false, 
                data: book.error
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
        const book = await Books.findByIdAndRemove(id);
        if (!book.error) {
            res.status(200).json({
                success: true, 
                data: `${id} was successfully deleted`
            })
        } else {
            res.status(400).json({
                success: false, 
                data: book.error
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