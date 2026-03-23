import { carsOrderByRelevanceFieldEnum } from "../generated/prisma/internal/prismaNamespace.js"
import { prisma } from "../lib/prisma.js"
import { Request, Response } from "express"

export const getRentals = async (req:Request, res:Response) => {
    try {
        const rentals = await prisma.rental.findMany({
            include:{
                cars:true,
                users_rental_lessor_idTousers:true,
                users_rental_customer_idTousers:true
            }
        })
        res.status(200).json(rentals)
    } catch (err:any) {
        res.status(500).json(err.message)
    }
}

export const createRental = async (req:Request, res:Response) => {
    try {
        const {
            car_id,
            from,
            until,
            lessor_id,
            customer_id,
            rental_price,
            pickup_location,
            dropoff_location
        } = req.body

        const newRental = await prisma.rental.create({
            data:{
                car_id:car_id,
                from: from,
                until:until,
                lessor_id:lessor_id,
                customer_id:customer_id,
                rental_price:rental_price,
                pickup_location:pickup_location,
                dropoff_location:dropoff_location
            }
        })

        res.status(200).json(newRental)
    } catch (err:any) {
        res.status(500).json(err.message)
    }
}

export const updateRental = async (req:Request, res:Response) => {
    try {
        const id = Number(req.params.id)
        const {
            car_id,
            from,
            until,
            lessor_id,
            customer_id,
            rental_price,
            pickup_location,
            dropoff_location
        } = req.body

        const updatedRental = await prisma.rental.update({
            where:{
                id:id
            },
            data:{
                car_id:car_id,
                from: from,
                until:until,
                lessor_id:lessor_id,
                customer_id:customer_id,
                rental_price:rental_price,
                pickup_location:pickup_location,
                dropoff_location:dropoff_location
            }
        })

        res.status(200).json(updatedRental)
    } catch (err:any) {
        res.status(500).json(err.message)
    }
}

export const deleteRental = async (req:Request, res:Response) => {
    try {
        const id = Number(req.params.id)

        const deletedRental = await prisma.rental.update({
            where:{
                id:id
            },
            data:{
                deleted:true,
                deletedAt: new Date()
            }
        })

        res.status(200).json(deletedRental)
    } catch (err:any) {
        res.status(500).json(err.message)
    }
}
