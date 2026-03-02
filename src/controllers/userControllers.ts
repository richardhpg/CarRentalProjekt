import { prisma } from "../lib/prisma.js"
import { Request, Response } from "express"


export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.users.findMany({})
        res.status(200).json(users)
    } catch (err: any) {
        res.status(500).json({ message: err.message })
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, age, contact_email, contact_phoneNumber } = req.body

        const newUser = await prisma.users.create({
            data: {
                name: name,
                age: age,
                contact_email: contact_email,
                contact_phoneNumber: contact_phoneNumber
            }
        })

        res.status(200).json(newUser)
    } catch (err: any) {
        res.status(500).json({ message: err.message })
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params)

        const deletedUser = await prisma.users.update({
            
        })
    } catch (err: any) {
        res.status(500).json({ message: err.message })
    }
}
