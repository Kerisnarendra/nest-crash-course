import { Request, Response, NextFunction } from "express";

export function FunctionMiddleware(req: Request, res: Response, next: NextFunction) {
    // Log the request details
    console.log('Request:', req.method, req.originalUrl);

    // Log the response details
    res.on('finish', () => {
        console.log('Response:', res.statusCode);
    });
    next();    
}