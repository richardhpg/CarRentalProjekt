import bcrypt from "bcrypt";
import jwt from "json-web-token"
import { prisma } from "../lib/prisma.js"
import { Request, response, Response } from "express"

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

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        const hashedPassword = await bcrypt.hash(password, SALT)

        const user = await prisma.users.findUnique({
            where: {
                email: email
            }
        })

        if (user == null || user == "" || user == 0) {
            response.status(400).json({ message: "Nem megfelelő e-mail vagy jelszó" })
        }
        else {  
            if (user.password == hashedPassword) {
                res.status(200).json({message: "Sikeres bejelentkezés"})
            }
            else
            {
                response.status(400).json({ message: "Nem megfelelő e-mail vagy jelszó" })
            }
        }
    } catch (err: any) {
        res.status(500).json(err.message)
    }
}