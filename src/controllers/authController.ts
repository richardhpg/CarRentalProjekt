import bcrypt from "bcrypt";
import jwt from "json-web-token"
import { prisma } from "../lib/prisma.js"
import { Request, Response } from "express"

const SALT = 10

export const register = async (req: Request, res: Response) => {
    try {
        const { name, age, contact_email, contact_phoneNumber, password } = req.body;

        const passwordHash = await bcrypt.hash(password, SALT)

        const newUser = await prisma.users.create({
            data: {
                name: name,
                age: age,
                contact_email: contact_email,
                contact_phoneNumber: contact_phoneNumber,
                password: passwordHash
            }
        })

        res.status(200).json(newUser)
    } catch (err: any) {
        res.status(500).json({ message: err.message })
    }
}
