import User from '../models/UserModel.js'

export const createUser = async(req , res)=>{
    const {name , email , sub : auth0Id} = req.body

    if (!name || !email || !auth0Id){
        return res.status(400).send({message : 'required all fileds'})
    }

    try {
        const existingUser = await User.findOne({email})
        if (existingUser) {
            console.log('loged in sucessfully')
            return res.status(200).send({message : "Loged In Sucessfully" })
        }

        const newUser = new User({name , email , auth0Id})
        await newUser.save()

        console.log('User created sucessfully')
        return res.status(201).send({message : "Signed Up Sucessfully" })

    } catch (error) {
        console.log(error.message)
        return res.status(400).send({message: error.message})
    }
}

export const getUser = async(req , res)=>{

    const {id : auth0Id} = req.params

    try {
        const user = await User.findOne({auth0Id})
        
        if(!user){
            return res.status(400).send({message : "user not found"})
        }

        console.log("getUserController",user)
        return res.status(200).send({data : user , message : "user found"})
    } catch (error) {
        return res.status(400).send({message : "get user failed"})
    }   
}

export const updateUser = async(req , res)=>{

    const body = req.body
    const {id : auth0Id} = req.params

    try {
        const updatedUser = await User.findOneAndUpdate({auth0Id} , body , {new : true})

        console.log("updated user : \n",updatedUser)

        if (!updatedUser){
            return res.status(400).send({message:"No user found"})
        }
        return res.status(200).send({data : updatedUser , message : "User Updated sucessfully"})
    } catch (error) {
        return res.status(400).send({message : "update user failed"})
    }    
}