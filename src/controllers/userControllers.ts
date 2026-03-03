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
      return res.json(req.body)
    try {
        const { name, age, contact_email, contact_phoneNumber, password } = req.body;

        const newUser = await prisma.users.create({
            data: {
                name: name,
                age: age,
                contact_email: contact_email,
                contact_phoneNumber: contact_phoneNumber,
                password: password
            }
        })

        res.status(200).json(newUser)
    } catch (err: any) {
        res.status(500).json({ message: err.message })
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const usedID = Number(req.params.id)

        const deletedUser = await prisma.users.update({
            where:{
                id:usedID
            },
            data:{
                deleted: true,
                deletedAt: new Date()
            }
        })
        res.status(200).json(deletedUser)
    } catch (err: any) {
        res.status(500).json({ message: err.message })
    }
}
