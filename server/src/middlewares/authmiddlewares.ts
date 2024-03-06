import { Request, Response } from 'express';
import jwt from 'jsonwebtoken'
class Middleware{
    static async authMiddleware(req:Request, res:Response, next:any){
        try {
            // Check for authorization header presence and proper format
            if (!req.headers?.authorization || !req.headers.authorization.startsWith('Bearer ')) {
                return res.status(401).send({ success: false, message: 'Unauthorized' });
            }
            const token = req.headers.authorization.split(' ')[1];
            // Verify the token using JWT
            const decoded:any = await jwt.verify(token, process.env.JWT_SECRET!!); 
            // Attach decoded user ID to request body
            req.body.userId = decoded.userId;
            next();
        } catch (error) {
            console.error('Error verifying token:', error);
            res.status(401).send({ success: false, message: 'Unauthorized' }); 
        }
    };
    
}

export default Middleware