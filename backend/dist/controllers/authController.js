import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { prisma } from "../lib/prisma.js";
export const register = async (req, res) => {
    try {
        const { name, age, contact_email, contact_phoneNumber, password } = req.body;
        const existingUser = await prisma.users.findUnique({
            where: { contact_email },
        });
        if (existingUser) {
            return res.status(400).json({ message: "Ez az e-mail cím már regisztrálva van!" });
        }
        const passwordHash = await bcrypt.hash(password, Number(process.env.SALT));
        const newUser = await prisma.users.create({
            data: {
                name: name,
                age: age,
                contact_email: contact_email,
                contact_phoneNumber: contact_phoneNumber,
                password: passwordHash,
            },
        });
        res.status(200).json(newUser);
    }
    catch (err) {
        res.status(500).json({ message: "Hiba történt a regisztráció során." });
    }
};
export const login = async (req, res) => {
    try {
        const { contact_email, password } = req.body;
        const user = await prisma.users.findUnique({
            where: {
                contact_email: contact_email,
            },
        });
        if (!user) {
            return res
                .status(400)
                .json({ message: "Nem megfelelő e-mail vagy jelszó (user not found)" });
        }
        // Átmeneti logolás a hiba felderítésére
        console.log("Login attempt - Email:", contact_email);
        console.log("Password provided:", password);
        console.log("Stored hash:", user.password);
        let match = false;
        // Ha a jelszó nincs hashelve az adatbázisban (pl. mock adat)
        if (!user.password.startsWith('$2b$')) {
            console.log("Warning: Password is not hashed in DB!");
            match = (password === user.password);
        }
        else {
            match = await bcrypt.compare(password, user.password);
        }
        console.log("Password match:", match);
        if (!match) {
            return res
                .status(400)
                .json({ message: "Nem megfelelő email vagy jelszó (password mismatch)" });
        }
        const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "45m" });
        const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
        req.session.refreshToken = refreshToken;
        // Explicit mentés, hogy biztosan elküldje a Set-Cookie headert
        req.session.save((err) => {
            if (err) {
                return res.status(500).json({ message: "Session mentési hiba" });
            }
            res.setHeader("Access-Control-Allow-Credentials", "true");
            // Nem küldjük vissza a jelszót
            const { password: _, ...userWithoutPassword } = user;
            return res.json({ accessToken, user: userWithoutPassword });
        });
    }
    catch (err) {
        res.status(500).json(err.message);
    }
};
export const checkUser = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.json({ checked: false });
        }
        const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
        return res.json({ checked: true, user, accessToken });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
export const logout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "Kijelentkezés sikertelen" });
        }
        res.clearCookie('connect.sid');
        return res.status(200).json({ message: "Sikeres kijelentkezés" });
    });
};
