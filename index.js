import express from 'express'
const app = express()
import mongoose from 'mongoose'
import cors from 'cors'
import 'dotenv/config'
import userRoutes from './routes/userRoutes.js'

const PORT = process.env.PORT || 5000
const MONGODB_URL = process.env.MONGODB_URL

app.use(express.json())
app.use(cors())

mongoose.connect(MONGODB_URL).then(()=>console.log('Connected to database'))

app.get('/' , (req , res)=>{
    res.send('hi')
})

app.use('/api/user' , userRoutes)
// app.use('/api/products' , productsRoutes)

app.listen( PORT , ()=>{
    console.log('server is running on port:',PORT)
})