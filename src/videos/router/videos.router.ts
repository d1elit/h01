import {Request, Response, Router} from 'express';
import {db} from "../../db/in-memory.db";
import {HttpStatus} from "../../core/types/http-statuses";
import {availableResolutions, Video} from "../types/video";


export const videosRouter =  Router({});



videosRouter.get('/', async (req: Request, res: Response ) => {
    res.status(HttpStatus.Ok).send(db.videos);
})


videosRouter.post('/', async (req: Request, res: Response ) => {
    const createdAtDate = new Date();
    const publicationDate = new Date(createdAtDate.getTime() + 24 * 60 * 60 * 1000);

    const newVideo: Video = {
        id:db.videos.length ? db.videos[db.videos.length - 1].id + 1 : 1,
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: req.body.canBeDownloaded || false,
        minAgeRestriction: req.body.minAgeRestriction || null,
        createdAt: createdAtDate,
        publicationDate: publicationDate,
        availableResolutions: req.body.availableResolutions || [availableResolutions.P144],
    }
    db.videos.push(newVideo)
    res.status(HttpStatus.Ok).send(db.videos);
})