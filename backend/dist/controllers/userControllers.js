import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt";
export const getUsers = async (req, res) => {
    try {
        const users = await prisma.users.findMany({});
        res.status(200).json(users);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
export const getUserById = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const foundUser = await prisma.users.findUnique({
            where: {
                id: id
            }
        });
        res.status(200).json(foundUser);
    }
    catch (err) {
        res.status(err.status).json({ message: err.message });
    }
};
export const deleteUser = async (req, res) => {
    try {
        const userID = Number(req.params.id);
        const deletedUser = await prisma.users.update({
            where: {
                id: userID
            },
            data: {
                deleted: true,
                deletedAt: new Date()
            }
        });
        res.status(200).json(deletedUser);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
export const getMe = async (req, res) => {
    res.json(req.user);
};
export const updateUser = async (req, res) => {
    try {
        const userID = Number(req.params.id);
        const { name, age, contact_email, contact_phoneNumber, password } = req.body;
        let hashedPassword;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }
        const updatedUser = await prisma.users.update({
            where: {
                id: userID
            },
            data: {
                name: name,
                age: age,
                contact_email: contact_email,
                contact_phoneNumber: contact_phoneNumber,
                password: hashedPassword
            }
        });
        res.status(200).json(updatedUser);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
