import asyncHandler from 'express-async-handler'
import { prisma } from '../config/prismaConfig.js'
export const createUser = asyncHandler(async(req,res)=>{
    console.log("creating user")
    let{ email} =req.body

    const userExists=await prisma.user.findUnique({where:{email:email}})
    //verificando se o usuario ja foi cadastrado
    if(!userExists){
        const user = await prisma.user.create({data:req.body})
        res.send(({message:"Usuario registrado", user:user}))
    }
    else{
        res.status(201).send({message:"Usuario ja registrado"})
    }
    
})

//funcao de marcar visita
export const bookVisit =asyncHandler(async(req,res)=>{
    const {email,date}=req.body
    const {id}=req.params
    try {
        const javisitou=await prisma.user.findUnique({
            where:{email},
            select:{bookedVisits:true}
        })
        //verifica se contem o id
        if(javisitou.bookedVisits.some((visit)=>visit.id===id)){
            res.status(400).json({message:"Você ja marcou essa propriedade"})
        }
        else{
            await prisma.user.update({
                where:{email:email},
                data:{
                    bookedVisits:{push:{id,date}}
                }
            })
         res.send("Sua visita foi marcada")

        }
    } catch (error) {
        throw new Error (error.message)
    }
})

export const allBookings =asyncHandler(async(req,res)=>{
    const {email}=req.body
    try {
        const bookings=await prisma.user.findUnique({
            where:{email},
            select :{bookedVisits:true}
        })
        res.status(200).send(bookings)
    } catch (error) {
        throw new Error(error)
    }
})

export const cancelBooking = asyncHandler(async (req,res)=>{
    const {email}=req.body
    const {id}=req.params
    try {
        const user = await prisma.user.findUnique({
            where:{email:email},
            select :{bookedVisits:true}
        })
        //ate achar o index
        const index = user.bookedVisits.findIndex((visit)=>visit.id===id)
        if(index===-1){
            res.status(404).json({message:"Visita nao encontrada"})
        }
        else{
            //para deletar apenas um elemento q é oq tem o index = oq encontramos
            user.bookedVisits.splice(index,1)
            await prisma.user.update({
                where:{email},
                data:{
                    bookedVisits:user.bookedVisits
                }
            })
            res.send("Visita cancelada com sucesso")
        }
    } catch (error) {
        throw new Error(error)
    }
})

export const toFav=asyncHandler(async(req,res)=>{
    const {email}=req.body
    const{rid}=req.params
    try {
        const user = await prisma.user.findUnique({
            where:{email}
        })
        if(user.favoriteResidenciesId.includes(rid)){
            const updateUser=await prisma.user.update({
                where:{email},
                data:{
                    favoriteResidenciesId:{
                        set: user.favoriteResidenciesId.filter((id)=>id!==id)
                    }
                }
            })
            res.send({message:"Removido das favoritos",user:updateUser})

        }
        else{
            const updateUser=await prisma.user.update({
                where:{email},
                data:{
                    favoriteResidenciesId:{
                        push:rid
                    }
                }
            })
            res.send({message:"Favoritos atualizados",user:updateUser})
        }
    } catch (error) {
        throw new Error(error)
    }
})

export const getAllFavorites =asyncHandler(async(req,res)=>{
    const {email}=req.body
    try {
        const favResd=await prisma.user.findUnique({
            where:{email},
            select:{favoriteResidenciesId:true}
        })
        res.status(200).send(favResd)
    } catch (error) {
        throw new Error(error)
    }
})