import asyncHandler from 'express-async-handler'
import { prisma } from '../config/prismaConfig.js'
export const createProperty = asyncHandler(async(req,res)=>{
    const {title, description, price, address,type, faixa, country,city,facilities,image,userEmail}=req.body.data    
    // console.log("no createProperty: "+req.body.data)
    try{
        const property = await prisma.property.create({
            data:{title, 
                description, 
                price, 
                address, 
                country,
                type,
                faixa,
                city,
                facilities,
                image,
                owner:{connect:{email:userEmail}}
            }           
        })
        res.send({message:"Propriedade criada com sucessos",property})
    }catch(err){
        if(err.code==="P2002")
        {
            throw new Error ("ja tem ")
        }
        throw new Error(err.message)
    }
})
export const editProperty = asyncHandler(async(req,res)=>{
    const {id,title, description, price, address,type, faixa, country,city,facilities,image,userEmail}=req.body.data    
    

    try {
        const updatedResidency=await prisma.property.update({where:{id:id} ,data:{
            title:title, //e passar todos com as novas infos a principio
                description:description, 
                price:price, 
                address:address, 
                country:country,
                type:type,
                city:city,
                facilities:facilities,
                image:image,
         }})
        res.send(updatedResidency)
        }catch (error) {
        throw new Error (error.message)
    }
})
export const deleteProperty = asyncHandler(async(req,res)=>{
    const {id}=req.body.data    

    try {
        await prisma.property.delete({where:{id:id}})
       
        }catch (error) {
        throw new Error (error.message)
    }
})
   
   

//pegar todas as propriedades

export const getAllProperties =asyncHandler(async(req,res)=>{
    
    try {
        const properties = await prisma.property.findMany({
        orderBy:{
            createdAt:"desc"
        }
    })
    res.send(properties)

        
    } catch (error) {
        console.log(error)
    }
})

export const getProperty = asyncHandler(async(req,res)=>{
    //quando usa o url para enviar parametros
    const {id}=req.params
    try {
        const property = await prisma.property.findUnique({
            where:{id:id}
        })
        res.send(property)
    } catch (error) {
        throw new Error (error.message)
    }
})
