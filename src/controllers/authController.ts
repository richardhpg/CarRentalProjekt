import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
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

        const user = await prisma.users.findUnique({
            where: {
                contact_email: contact_email
            }
        })

        if (!user) {
            return res.status(400).json({ message: "Nem megfelelő e-mail vagy jelszó" })
        }
        let match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ message: "Nem megfelelő email vagy jelszó" })


        }
        const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "45m" })
        const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "5d" })
        const test = new Date(new Date().setDate(new Date().getDate() + 7))
        console.log(test)

        await prisma.refresh_token.create({
            data: {
                token: refreshToken,
                user_id: user.id,
                expiresAt: test
            }
        })

        res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; HttpOnly; Path=/; SameSite=Lax`);
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        return res.json({ accessToken });
    }
    catch (err: any) {
        res.status(500).json(err.message)
    }
}