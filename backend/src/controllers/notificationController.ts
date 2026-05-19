import { prisma } from "../lib/prisma.js";
import { Request, Response } from "express";

export const getNotifications = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;
    const userId = parseInt(Array.isArray(idParam) ? idParam[0] : idParam, 10);

    if (Number.isNaN(userId)) {
      return res.status(400).json({ message: "Érvénytelen felhasználói azonosító." });
    }

    const authUserId = (req as any).user?.id;
    if (!authUserId) {
      return res.status(401).json({ message: "Bejelentkezés szükséges." });
    }

    if (authUserId !== userId) {
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

export const createNotification = async (
  req: Request,
  res: Response,
) => {
  try {
    const authUserId = (req as any).user?.id;

    if (!authUserId) {
      return res.status(401).json({
        message: "Bejelentkezés szükséges.",
      });
    }

    const { advertisement_id, title } = req.body ?? {};

    const advertisementId = Number(advertisement_id);

    if (!Number.isInteger(advertisementId)) {
      return res.status(400).json({
        message: "Érvénytelen hirdetés azonosító.",
      });
    }

    if (typeof title !== "string" || !title.trim()) {
      return res.status(400).json({
        message: "A bérlési szándék szövege kötelező.",
      });
    }

    const advertisement = await prisma.advertisement.findUnique({
      where: { id: advertisementId },
      select: {
        user_id: true,
        deleted: true,
      },
    });

    if (!advertisement || advertisement.deleted) {
      return res.status(404).json({
        message: "Hirdetés nem található.",
      });
    }

    if (advertisement.user_id === authUserId) {
      return res.status(400).json({
        message:
          "Nem küldhetsz bérlési szándékot a saját hirdetésedre.",
      });
    }

    const safeTitle = title.trim().slice(0, 80);

    const notification = await prisma.notifications.create({
      data: {
        seller_id: advertisement.user_id,
        buyer_id: authUserId,
        advertisement_id: advertisementId,
        status: "pending",
        title: safeTitle,
      },
    });

    return res.status(201).json(notification);
  } catch (err) {
    console.error("Create notification error:", err);

    return res.status(500).json({
      message: "Hiba az értesítés létrehozása során.",
    });
  }
};

export const updateNotificationStatus = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;
    const id = parseInt(Array.isArray(idParam) ? idParam[0] : idParam, 10);
    const { status } = req.body;
    const userId = (req as any).user?.id;

    if (Number.isNaN(id)) {
      return res.status(400).json({ message: "Érvénytelen értesítés azonosító." });
    }

    if (!["accepted", "denied"].includes(status)) {
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