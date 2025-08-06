import { Request, Response, Router } from 'express';
import {db} from "../../db/in-memory.db";
import {HttpStatus} from "../../core/types/http-statuses";



export const videosRouter =  Router({});



videosRouter.get('/', async (req: Request, res: Response ) => {
    res.status(HttpStatus.Ok).send(db.videos);
})

