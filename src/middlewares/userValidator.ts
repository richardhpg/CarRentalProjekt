import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'
import { access } from 'node:fs'
import { ref } from 'node:process'

const refreshToken = async(req:Request,res:Response, next: NextFunction) => {
    console.log(req.headers.authorization)
    
    next()
    // try {
    //     if (!accessToken) {
    //         if (!refreshToken) {
    //             no
    //         }
    //         use refreshToken -> new accessToken && new refreshToken
    //     }
    // } catch (err:any) {
    //     response.status(500).json({message: err.message})
    // }
}

export default refreshToken;