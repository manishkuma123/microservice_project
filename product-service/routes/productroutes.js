const express = require("express");
const product = require("../modules/product");
const { authentication } = require("../authentication");
const router = express.Router()


router.post('/product', authentication,async(req,res)=>{
    try {
        const products = new product(req.body)
        await products.save()
        res.status(200).json({products})

    } catch (error) {
        console.error(error)
        res.status(500).json({message:"failed to create product "})
    }
   
})

router.get('/allproducts',authentication,async(req,res)=>{
    try {
        const allproduct = await product.find()
       res.status(200).json({allproduct});

    } catch (error) {
        console.error(error)
        res.json({error})
    }
})

router.get('/product/:id',authentication, async(req,res)=>{
    try {
        const productid = req.params.id;
        const products  = await product.findById(productid)
        if(products){
            res.json(products)
        }else{
            res.status(404).json({message:'product not found'})
        }
    } catch (error) {
        console.error(error);
        res.json({error})
    }
})
module.exports = router