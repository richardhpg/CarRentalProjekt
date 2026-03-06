import { prisma } from "../lib/prisma.js"
import { Request, Response } from "express"

export const getAds = async (req: Request, res: Response) => {
    try {
        const advertisements = await prisma.advertisement.findMany({
            include: {
                cars: true,
                users: true
            }
        })
        res.status(200).json(advertisements)
    } catch (err: any) {
        res.status(500).json(err.message)
    }
}

export const getAdsById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)

        const advertisement = await prisma.advertisement.findUnique({
            where: {
                id: id
            },
            include: {
                cars: true,
                users: true
            }
        })
        res.status(200).json(advertisement)
    } catch (err: any) {
        res.status(500).json(err.message)
    }
}

export const createAd = async (req: Request, res: Response) => {
    try {
        const {
            car_id,
            user_id,
            location,
            status,
            description,
            smoking,
            animal,
            max_km_per_day
        } = req.body

        const newAd = await prisma.advertisement.create({
            data: {
                car_id: car_id,
                user_id: user_id,
                location: location,
                status: status,
                description: description,
                smoking: smoking,
                animal: animal,
                max_km_per_day: max_km_per_day
            }
        })
        res.status(200).json(newAd)
    } catch (err: any) {
        res.status(500).json(err.message)
    }
}

export const updateAd = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const {
            car_id,
            user_id,
            location,
            status,
            description,
            smoking,
            animal,
            max_km_per_day
        } = req.body

        const updatedAd = await prisma.advertisement.update({
            where: {
                id: id
            },
            data: {
                car_id: car_id,
                user_id: user_id,
                location: location,
                status: status,
                description: description,
                smoking: smoking,
                animal: animal,
                max_km_per_day: max_km_per_day
            }
        })
        res.status(200).json(updatedAd)
    } catch (err: any) {
        res.status(500).json(err.message)
    }
}

export const deleteAd = async (req:Request, res:Response) => {
    try {
        const id = Number(req.params.id)

        const deletedAd = await prisma.advertisement.update({
            where:{
                id:id
            },
            data:{
                deleted:true,
                deletedAt: new Date()
            }
        })
        res.status(200).json(deletedAd)
    } catch (err:any) {
        res.status(500).json(err.message)
    }
}