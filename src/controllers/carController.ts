import { prisma } from "../lib/prisma.js"
import { Request, Response } from "express"

export const getCars = async (req: Request, res: Response) => {
    try {
        const cars = await prisma.cars.findMany({})
        res.status(200).json(cars)
    } catch (err: any) {
        res.status(500).json({ message: err.message })
    }
}

export const getCarById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)

        const foundCar = await prisma.cars.findUnique({
            where: {
                id: id
            }
        })
        res.status(200).json(foundCar)
    } catch (err: any) {
        res.status(500).json({ message: err.message })
    }
}

export const createCar = async (req: Request, res: Response) => {
    try {
        const {
            user_id,
            make,
            model,
            prod_year,
            available,
            driving_licence,
            pictures,
            trunk_space,
            daily_rate,
            deposit,
            licence_plate,
            fuel_type,
            doors_number,
            air_con,
            seats_number,
            gearbox_type
        } = req.body

        const newCar = await prisma.cars.create({
            data: {
                user_id: user_id,
                make: make,
                model: model,
                prod_year: prod_year,
                available: available,
                driveing_licence: driving_licence,
                pictures: pictures,
                trunk_space: trunk_space,
                daily_rate: daily_rate,
                deposit: deposit,
                licence_plate:licence_plate,
                fuel_type:fuel_type,
                doors_number:doors_number,
                air_con:air_con,
                seats_number:seats_number,
                gearbox_type:gearbox_type
            }
        })
        res.status(200).json(newCar)
    } catch (err: any) {
        res.status(500).json({ message: err.message })
    }
}

export const updateCar = async (req: Request, res: Response) => {
    try {
        const carId = Number(req.params.id)

        const {
            user_id,
            make,
            model,
            prod_year,
            available,
            driving_licence,
            pictures,
            trunk_space,
            daily_rate,
            deposit,
            licence_plate,
            fuel_type,
            doors_number,
            air_con,
            seats_number,
            gearbox_type
        } = req.body

        const updatedCar = await prisma.cars.update({
            where:{
                id:carId
            },
            data: {
                user_id: user_id,
                make: make,
                model: model,
                prod_year: prod_year,
                available: available,
                driveing_licence: driving_licence,
                pictures: pictures,
                trunk_space: trunk_space,
                daily_rate: daily_rate,
                deposit: deposit,
                licence_plate:licence_plate,
                fuel_type:fuel_type,
                doors_number:doors_number,
                air_con:air_con,
                seats_number:seats_number,
                gearbox_type:gearbox_type
            }
        })
        res.status(200).json(updatedCar)
    } catch (err: any) {
        res.status(500).json({ message: err.message })
    }
}

export const deleteCar = async (req:Request, res:Response) => {
    try {
        const id = Number(req.params.id)

        const deletedCar = await prisma.cars.update({
            where:{
                id:id
            },
            data:{
                deleted: true,
                deletedAt: new Date()
            }
        })

        res.status(200).json(deletedCar)
    } catch (err: any) {
        res.status(500).json({ message: err.message })
    }
}