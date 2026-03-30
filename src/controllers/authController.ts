import bcrypt from "bcrypt";
import jwt from "json-web-token"
import { prisma } from "../lib/prisma.js"
import { Request, Response } from "express"

const SALT = 10

export const register = async (req: Request, res: Response) => {
    try {
        const { name, age, contact_email, contact_phoneNumber, password } = req.body;

        const passwordHash = await bcrypt.hash(password, SALT)
        console.log(passwordHash)

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

export const login = async (req: Request, res: Response) => {
    try {
        const { contact_email, password } = req.body

        console.log(password)

        const user = await prisma.users.findUnique({
            where: {
                contact_email: contact_email
            }
        })

        if (!user) {
           return res.status(400).json({ message: "Nem megfelelő e-mail" })
        }
        let match = await bcrypt.compare(password, user.password);
        console.log(match)  
        if (!match) {
            return res.status(400).json({ message: "Nem megfelelő jelszó" })
           
        }

         return res.status(200).json({message: "Sikeres bejelentkezés"})
        }
    catch (err: any) {
        res.status(500).json(err.message)
    }
}