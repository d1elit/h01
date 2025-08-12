import {Request, Response, Router} from 'express';
import {db} from "../../db/in-memory.db";
import {HttpStatus} from "../../core/types/http-statuses";
import {availableResolutions, Video} from "../types/video";
import {videoInputDtoValidation} from "../validation/videoInputDtoValidation";
import {createErrorMessages} from "../../core/utils/error.utils";
import {VideoInputDto} from "../dto/video.input-dto";


export const videosRouter =  Router({});



videosRouter.get('/', async (req: Request, res: Response ) => {
    res.status(HttpStatus.Ok).send(db.videos);
})


videosRouter.get('/:id', async (req: Request, res: Response ) => {
    const id = parseInt(req.params.id);
    const video = db.videos.find(video => video.id == id);

    if(!video) {
        res
            .status(HttpStatus.NotFound)
            .send(
                createErrorMessages([{field:'id', message:'Video not found'}])
            );
    }

    res.status(HttpStatus.Ok).send(video);

})

videosRouter.put('/:id', async (req: Request, res: Response ) => {
    const id = parseInt(req.params.id);
    const index = db.videos.findIndex(video => video.id === id);




    if(index === -1) {
        res
            .status(HttpStatus.NotFound)
            .send(
                createErrorMessages([{field:'id', message:'Video not found'}])
            );
        return
    }

    const video = db.videos[index];
    const videoDto: VideoInputDto = {
        id: video.id,
        author : req.body.author ?? video.author,
        title :req.body.title ?? video.title,
        canBeDownloaded : req.body.canBeDownloaded ??  video.canBeDownloaded,
        minAgeRestriction : req.body.minAgeRestriction ?? video.minAgeRestriction,
        availableResolutions : video.availableResolutions ?? video.availableResolutions,
        createdAt: video.createdAt,
        publicationDate: video.publicationDate,

    }

    const errors = videoInputDtoValidation(videoDto);
    if(errors.length > 0) {
        res.status(HttpStatus.BadRequest).send(createErrorMessages(errors));
        return
    }

    db.videos[index] = videoDto

    res.sendStatus(HttpStatus.NoContent);

})


videosRouter.delete('/:id', async (req: Request, res: Response ) => {
    const id = parseInt(req.params.id);
    const index = db.videos.findIndex(video => video.id === id);

    if(index === -1) {
        res
            .status(HttpStatus.NotFound)
            .send(
                createErrorMessages([{field:'id', message:'Video not found'}])
            );
        return
    }


    db.videos.splice(index, 1);
    res.sendStatus(HttpStatus.NoContent);

})


videosRouter.post('/', async (req: Request, res: Response ) => {

    const createdAtDate = new Date();
    const publicationDate = new Date(createdAtDate.getTime() + 24 * 60 * 60 * 1000);
    const videoDTO:VideoInputDto =  {
        id:db.videos.length ? db.videos[db.videos.length - 1].id + 1 : 1,
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: req.body.canBeDownloaded ?? false,
        minAgeRestriction: req.body.minAgeRestriction ?? null,
        availableResolutions: req.body.availableResolutions ?? [availableResolutions.P144],
        createdAt: createdAtDate.toISOString(),
        publicationDate: publicationDate.toDateString(),
    };



    const errors = videoInputDtoValidation(videoDTO);

    if(errors.length > 0 ) {
        res.status(HttpStatus.BadRequest).send(createErrorMessages(errors));
        return;
    }




    const newVideo: Video = {
        ...videoDTO,
        availableResolutions: req.body.availableResolutions || [availableResolutions.P144],
    }
    db.videos.push(newVideo)
    res.status(HttpStatus.Created).send(newVideo);
})


