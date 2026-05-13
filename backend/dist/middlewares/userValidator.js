import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma.js';
const refreshToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const accessToken = authHeader?.split(" ")[1];
    if (accessToken) {
        try {
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            const user = await prisma.users.findUnique({
                where: { id: Number(decoded.id) },
                select: {
                    id: true,
                    name: true,
                    contact_email: true,
                    contact_phoneNumber: true,
                    role: true
                }
            });
            if (user) {
                req.user = user;
                return next();
            }
        }
        catch (err) {
            console.log("Access token invalid or expired, checking session...");
        }
    }
    const refreshTokenFromSession = req.session.refreshToken;
    if (!refreshTokenFromSession) {
        return res.status(401).json({ message: "Unauthorized - No valid token or session" });
    }
    try {
        const decodedRefresh = jwt.verify(refreshTokenFromSession, process.env.REFRESH_TOKEN_SECRET);
        const user = await prisma.users.findUnique({
            where: { id: Number(decodedRefresh.id) },
            select: {
                id: true,
                name: true,
                contact_email: true,
                contact_phoneNumber: true,
                role: true
            }
        });
        if (!user) {
            return res.status(401).json({ message: "Unauthorized - User not found" });
        }
        req.user = user;
        next();
    }
    catch (err) {
        return res.status(401).json({ message: "Unauthorized - Session expired" });
    }
};
export default refreshToken;
