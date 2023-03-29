import Product from '../models/Product.js'
import path from 'path'
import fs from 'fs'

export default class ProductController {
    static getAll = async (req, res) => {
        try {
            const results = await Product.getAll()

            if(results.length === 0) {
                res.status(200).json({
                    msg: 'Data products is empty'
                })
            }else {
                res.status(200).json(results)
            }
        } catch (error) {
            console.info(error)
        }
    }
    static getProductById = async (req, res) => {
        const id = req.params.id
        try {
            const result = await Product.getProductById(id)

            if(result.length === 0) {
                res.status(200).json({
                    msg: 'Data products not found'
                })
            }else {
                res.status(200).json(result)
            }
        } catch (error) {
            console.info(error)
        }
    }
    static add = async (req, res) => {
        
        const data = req.body
        const image = req.files.images
        const imageSize = image.data.length
        const ext = path.extname(image.name)
        const imageName = image.md5 + ext
        const url = `${req.protocol}://${req.get('host')}/images/${imageName}`
        const allowType = ['.png', '.jgp', '.jpeg']

        if(!allowType.includes(ext.toLocaleLowerCase())) return res.status(422).json({ msg: 'Invalid images'})
        if(imageSize > 5000000) return res.status(422).json({ msg: 'Image must be lass than 5 MB'})

        image.mv(`./public/images/${imageName}`, async (err) => {
            if(err) return res.status(500).json({msg: err.message})

            try {
                const response = await Product.add(data, imageName, url)
                const { affectedRows } = response

                if(affectedRows > 0) {
                    res.status(201).json({
                        msg: 'Product added successfully'
                    })
                }else {
                    res.status(400).json({
                         msg: 'Failed to added data product'
                    })
                }
            } catch (error) {
                console.info(error.message)
            }
        })
    }
    static remove = async (req, res) => {
        try {
            const id = req.params.id
            const checkData = await Product.getProductById(id)

            if(checkData.length === 0) {
                res.status(404).json({
                    msg: 'The product you want to delete doesnt found'
                })
            }else {
                const { images } = checkData[0]
                const imagePath = `./public/images/${images}`
                fs.unlinkSync(imagePath)

                const response = await Product.remove(id)
                const { affectedRows } = response

                if(affectedRows > 0) {
                    res.status(200).json({
                        msg: 'Product removed successfully'
                    })
                }else {
                    res.status(400).json({
                        msg: 'Failed to remove product'
                    })
                }
            }
            
        } catch (error) {
            console.info(error.message)
        }
    }
    static update = async (req, res) => {
        const image = req.files.images
        const id = req.params.id
        const newData = req.body

        try {
            const checkData = await Product.getProductById(id)

            if(checkData.length === 0) return res.status(404).json({
                msg: 'Product not found'
            })
            
            let imageName = ''

            if(image === null) {
                const { images } = checkData[0]
                imageName = images
            }else {
                const imageSize = image.data.length
                const ext = path.extname(image.name)
                imageName = image.md5 + ext
                const allowType = ['.png', '.jgp', '.jpeg']

                if(!allowType.includes(ext.toLowerCase())) return res.status(422).json({ msg: 'Invalid images'})
                if(imageSize > 5000000) return res.status(422).json({ msg: 'Image must be lass than 5 MB'})

                const { images } = checkData[0]
                const imagePath = `./public/images/${images}`
                fs.unlinkSync(imagePath)

                image.mv(`./public/images/${imageName}`, async (err) => {
                    if(err) return res.status(500).json({msg: err.message})
                })
            }

            const url = `${req.protocol}://${req.get('host')}/images/${imageName}`
            const response = await Product.update(id, newData, imageName, url)
            const { affectedRows } = response

            if(affectedRows > 0) {
                res.status(200).json({
                    msg: 'Product updated successfully'
                })
            }else {
                res.status(400).json({
                    msg: 'Failed to update data product'
                })
            }
        } catch (error) {
            console.info(error.message)
        }
        
    }
}