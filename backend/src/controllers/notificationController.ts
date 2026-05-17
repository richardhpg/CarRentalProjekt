import { prisma } from "../lib/prisma.js";
import { Request, Response } from "express";

export const getNotifications = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.query.userId as string) || (req as any).user?.id;

    
    if ((req as any).user && (req as any).user.id !== userId) {
      return res.status(403).json({ message: "Nincs jogosultságod." });
    }

    
    const buyerRaw = await prisma.notifications.findMany({
      where: { buyer_id: userId },
      include: {
        advertisement: {
          include: {
            cars: { select: { make: true, model: true } },
          },
        },
        users_notifications_seller_idTousers: {
          select: { name: true, contact_phoneNumber: true, contact_email: true },
        },
      },
    });


    const sellerRaw = await prisma.notifications.findMany({
      where: { seller_id: userId },
      include: {
        advertisement: {
          include: {
            cars: { select: { make: true, model: true } },
          },
        },
        users_notifications_buyer_idTousers: {
          select: { name: true, age: true, contact_phoneNumber: true, contact_email: true },
        },
      },
    });

    const buyerNotifications = buyerRaw.map((n) => ({
      id: n.id,
      status: n.status,
      title: n.title,
      car: n.advertisement?.cars ?? null,
      seller: {
        name: n.users_notifications_seller_idTousers.name,
        phone: n.users_notifications_seller_idTousers.contact_phoneNumber,
        email: n.users_notifications_seller_idTousers.contact_email,
      },
    }));

    const sellerNotifications = sellerRaw.map((n) => ({
      id: n.id,
      status: n.status,
      title: n.title,
      car: n.advertisement?.cars ?? null,
      buyer: {
        name: n.users_notifications_buyer_idTousers.name,
        age: n.users_notifications_buyer_idTousers.age,
        phone: n.users_notifications_buyer_idTousers.contact_phoneNumber,
        email: n.users_notifications_buyer_idTousers.contact_email,
      },
    }));

    return res.json({ buyerNotifications, sellerNotifications });
  } catch (err: any) {
    return res.status(500).json({ message: "Hiba az értesítések lekérése során." });
  }
};

export const updateNotificationStatus = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;
    const id = parseInt(Array.isArray(idParam) ? idParam[0] : idParam, 10);
    const { status } = req.body;
    const userId = (req as any).user?.id;

    if (!["pending", "accepted", "denied"].includes(status)) {
      return res.status(400).json({ message: "Érvénytelen státusz." });
    }

    const notification = await prisma.notifications.findUnique({ where: { id } });

    if (!notification) {
      return res.status(404).json({ message: "Értesítés nem található." });
    }

    if (notification.seller_id !== userId) {
      return res.status(403).json({ message: "Csak a hirdető módosíthatja a státuszt." });
    }

    await prisma.notifications.update({
      where: { id },
      data: { status },
    });

    return res.json({ message: "Sikeres státusz frissítés." });
  } catch (err: any) {
    return res.status(500).json({ message: "Hiba a státusz frissítése során." });
  }
};