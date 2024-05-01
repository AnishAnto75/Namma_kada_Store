import Products from "../models/ProductsModel.js"

export const createProduct = async(req , res)=>{

    const {product_name , _id , product_category} = req.body

    if (!product_name || !_id || !product_category){
        return res.status(404).send({message : "Fill all the required fields"})
    }

    try {
        const existing_product = await Products.findOne({_id})

        if (existing_product){
            return res.status(400).send({message : "Product id already exists"})
        }

        const newProduct = new Products(req.body)
        if (req.file){
            const ProductImagePath = req.file.path.split('\\')[2]
            newProduct.product_photos = ProductImagePath
        }
        await newProduct.save()

        return res.status(201).send({data : newProduct , message : "New Product saved sucessfully"})
    } catch (error) {
        return res.status(400).send({message : "Cannot save the new product"})
    }
}

export const getAllProducts = async(req , res)=>{

    try {
        const products = await Products.find()
    
        if (!products){
            return res.status(404).send({message : "No products found"})
        }
    
        return res.status(200).send({data : products , message : "All products found" })
        
    } catch (error) {
        return res.status(400).send({message : "Get all product failed"})
    }
}

export const getProduct = async(req , res)=>{

    const {id : _id} = req.params

    try {
        const product = await Products.findOne({_id}) 

        if(!product){
            return res.status(404).send({message : "No products found"})
        }

        return res.status(200).send({data : product , message : "product found"})
    } catch (error) {
        return res.status(400).send({message : "Get product failed"})
    }
}

export const updateProduct = async(req , res)=>{

    const {id} = req.params

    console.log('updateProduct',req.body)

    const {product_name , _id , product_category} = req.body
    if (!product_name || !_id , !product_category){
        return res.status(404).send({message : "Fill all the required fields"})
    }

    const product = await Products.findOne({_id})

    if (!product || id !== _id){
        try {

            const existing_product_Id = await Products.findOne({_id})
            if(existing_product_Id){
                return res.status(400).send({message : 'product Id already exist'})
            }

            const newProduct = new Products(req.body)
            if (req.file){
                const ProductImagePath = req.file.path.split('\\')[2]
                newProduct.product_photos = ProductImagePath
            }
            await newProduct.save()

            return res.status(201).send({data : newProduct , message : "New Product saved sucessfully"})
        } 
        catch (error) {
            return res.status(400).send({message : "cannot save the new product"})
        }
    }
    try {
        if (req.file){
            const product_photos = req.file.path.split('\\')[2]
            req.body.product_photos = product_photos
        }
        const product = await Products.findOneAndUpdate({_id} , req.body , {new : true})

        return res.status(200).send({data : product , message : "Product updated sucessfully"} )
    }
    catch (error) {
        return res.status(400).send({message :"cannot update a product"})
    }
}

export const deleteProduct = async(req , res)=>{
    const {id : _id} = req.params

    try {
        const product = await Products.findOne({_id})

        if(!product){
            return res.status(204).send({message : "Product have already been deleted"})
        }

        await product.deleteOne({_id})

        return res.status(200).send({Message : "product deleted sucessfully" })
    } catch (error) {
        res.status(400).send({message : "failed to delete the product"})
    }
}