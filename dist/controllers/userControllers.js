import { prisma } from "../lib/prisma.js";
export const getUsers = async (req, res) => {
    try {
        const users = await prisma.users.findMany({});
        res.status(200).json(users);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
export const createUser = async (req, res) => {
    return res.json(req.body);
    // try {
    //     const { name, age, contact_email, contact_phoneNumber, password } = req.body;
    //     const newUser = await prisma.users.create({
    //         data: {
    //             name: name,
    //             age: age,
    //             contact_email: contact_email,
    //             contact_phoneNumber: contact_phoneNumber,
    //             password: password
    //         }
    //     })
    //     res.status(200).json(newUser)
    // } catch (err: any) {
    //     res.status(500).json({ message: err.message })
    // }
};
export const deleteUser = async (req, res) => {
    try {
        const usedID = Number(req.params.id);
        const deletedUser = await prisma.users.update({
            where: {
                id: usedID
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
