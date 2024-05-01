import express from 'express'
import { createProduct, getAllProducts, getProduct, updateProduct } from '../controllers/productsControllers.js'
import upload from '../middleware/productImageUpload.js'

const router = express.Router()

router.get('/' , getAllProducts)
router.get('/:id' , getProduct)
router.post('/' , upload.single('product_photos') , createProduct)
router.put('/:id' ,upload.single('product_photos') , updateProduct)

export default router