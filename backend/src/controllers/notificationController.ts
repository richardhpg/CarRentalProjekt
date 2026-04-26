import { Request, Response } from "express"
import { prisma } from "../lib/prisma.js"

const ALLOWED_STATUSES = ["pending", "accepted", "denied"]

export const createNotification = async (req: Request, res: Response) => {
    try {
        const { buyer_id, advertisement_id, title } = req.body

        if (!buyer_id || !advertisement_id) {
            return res.status(400).json({ message: "A buyer_id es advertisement_id kotelezo." })
        }

        const advertisement = await prisma.advertisement.findUnique({
            where: {
                id: Number(advertisement_id)
            }
        })

        if (!advertisement) {
            return res.status(404).json({ message: "A hirdetes nem talalhato." })
        }

        if (advertisement.user_id === Number(buyer_id)) {
            return res.status(400).json({ message: "Sajat hirdetesre nem adhatsz le berlesi igenyt." })
        }

        const existingPending = await prisma.notifications.findFirst({
            where: {
                buyer_id: Number(buyer_id),
                advertisement_id: Number(advertisement_id),
                status: "pending"
            }
        })

        if (existingPending) {
            return res.status(409).json({ message: "Ehhez a hirdeteshez mar van fuggoben levo kerelmed." })
        }

        const notification = await prisma.notifications.create({
            data: {
                seller_id: advertisement.user_id,
                buyer_id: Number(buyer_id),
                advertisement_id: Number(advertisement_id),
                status: "pending",
                title: title || "Uj berlesi szandek erkezett."
            }
        })

        return res.status(201).json(notification)
    } catch (err: any) {
        return res.status(500).json({ message: err.message })
    }
}

export const getNotificationCenter = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.query.userId)

        if (!userId) {
            return res.status(400).json({ message: "A userId megadasa kotelezo." })
        }

        const notifications = await prisma.notifications.findMany({
            where: {
                OR: [
                    { buyer_id: userId },
                    { seller_id: userId }
                ]
            },
            include: {
                users_notifications_seller_idTousers: true,
                users_notifications_buyer_idTousers: true,
                advertisement: {
                    include: {
                        cars: true
                    }
                }
            },
            orderBy: {
                id: "desc"
            }
        })

        const buyerNotifications = notifications
            .filter((notification) => notification.buyer_id === userId)
            .map((notification) => ({
                id: notification.id,
                status: notification.status,
                title: notification.title,
                car: {
                    make: notification.advertisement?.cars?.make ?? "Ismeretlen",
                    model: notification.advertisement?.cars?.model ?? "auto"
                },
                seller: {
                    name: notification.users_notifications_seller_idTousers.name,
                    phone: notification.users_notifications_seller_idTousers.contact_phoneNumber,
                    email: notification.users_notifications_seller_idTousers.contact_email
                }
            }))

        const sellerNotifications = notifications
            .filter((notification) => notification.seller_id === userId)
            .map((notification) => ({
                id: notification.id,
                status: notification.status,
                title: notification.title,
                car: {
                    make: notification.advertisement?.cars?.make ?? "Ismeretlen",
                    model: notification.advertisement?.cars?.model ?? "auto"
                },
                buyer: {
                    name: notification.users_notifications_buyer_idTousers.name,
                    age: notification.users_notifications_buyer_idTousers.age,
                    phone: notification.users_notifications_buyer_idTousers.contact_phoneNumber,
                    email: notification.users_notifications_buyer_idTousers.contact_email
                }
            }))

        return res.status(200).json({
            buyerNotifications,
            sellerNotifications
        })
    } catch (err: any) {
        return res.status(500).json({ message: err.message })
    }
}

export const updateNotificationStatus = async (req: Request, res: Response) => {
    try {
        const notificationId = Number(req.params.id)
        const { userId, status } = req.body

        if (!userId || !status) {
            return res.status(400).json({ message: "A userId es status mezok kotelezok." })
        }

        if (!ALLOWED_STATUSES.includes(status)) {
            return res.status(400).json({ message: "Ervenytelen status ertek." })
        }

        const existingNotification = await prisma.notifications.findUnique({
            where: {
                id: notificationId
            }
        })

        if (!existingNotification) {
            return res.status(404).json({ message: "Az ertesites nem talalhato." })
        }

        if (existingNotification.seller_id !== Number(userId)) {
            return res.status(403).json({ message: "Csak az elado frissitheti a statust." })
        }

        const updatedNotification = await prisma.notifications.update({
            where: {
                id: notificationId
            },
            data: {
                status: status
            }
        })

        return res.status(200).json(updatedNotification)
    } catch (err: any) {
        return res.status(500).json({ message: err.message })
    }
}
