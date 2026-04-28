import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'
import { prisma } from '../lib/prisma.js';

const refreshToken = async (req: any, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization?.split(" ")[1]
    
    console.log("Access token received: ", accessToken)
    try {
        const decoded = await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)

        console.log(decoded.id)
        const user = await prisma.users.findUnique({
            where:{
                id: Number(decoded.id)
            },
            select:{
                id: true,
                name: true,
                contact_email: true,
                contact_phoneNumber: true,
            }
        });
        req.user = user;
        console.log(user)
        next()
        //res.status(200).json({ message: "Token is valid: ", decoded })
    } catch (err: any) {
        if (err.name === "TokenExpiredError") {
            const refreshTokenFromCookie = req.cookies.refreshToken;
            // console.log(req)
            console.log(req.headers.cookie)
            console.log(req.cookies)
            const refreshToken = await prisma.refresh_token.findUnique({
                where: {
                    token: refreshTokenFromCookie
                }
            })

            const refreshTokenFromCookieDecode = jwt.verify(refreshTokenFromCookie, process.env.REFRESH_TOKEN_SECRET)

            if (!refreshTokenFromCookieDecode || !refreshToken || refreshToken.revoked == true) {
                return res.status(401).json({ message: "Unauthorized Access" })
            }

            const newAccessToken = jwt.sign({ id: refreshToken.user_id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "45m" })

            await prisma.refresh_token.update({
                where: {
                    token: refreshTokenFromCookie
                },
                data: {
                    revoked: true
                }
            })

            const newRefreshToken = jwt.sign({ id: refreshToken.user_id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "5d" })
            const test = new Date(new Date().setDate(new Date().getDate() + 5))

            await prisma.refresh_token.create({
                data: {
                    token: newRefreshToken,
                    user_id: refreshToken.user_id,
                    expiresAt: test
                }
            });

            console.log("Access token expired, new access token issued: ", newAccessToken)

            let obj = {
                accessToken: accessToken,
                refreshToken: refreshToken,
                httpOnly: true,
                secure: false,
                path: '/refresh',
                maxAge: 7 * 24 * 60 * 60 * 1000
            }

            req.refreshToken = obj;
        }
        else {
            return res.status(401).json({ message: err.message })
        }

    }    
}


export default refreshToken;