import { response } from 'express'
import jwt from 'jsonwebtoken'

export const refresh( async(req:Request,res:Response) => {
    try {
        const accessToken = 
    } catch (err:any) {
        response.status(500).json({message: err.message})
    }
})