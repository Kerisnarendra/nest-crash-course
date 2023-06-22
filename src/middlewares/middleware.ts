import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class Middleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        // Log the request details
        console.log('Request:', req.method, req.originalUrl);

        // Log the response details
        res.on('finish', () => {
            console.log('Response:', res.statusCode);
        });
        next();
    }    
}