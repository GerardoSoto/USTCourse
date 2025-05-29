
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request incoming, catched from middleware...' );

    // req.body.name.trim();
    // req.body.description = req.body.description.trim();
    next();
  }
}
