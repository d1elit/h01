import request from 'supertest';
import express from 'express';
import {setupApp} from "../../src/setup-app";
import {availableResolutions, Video} from "../../src/videos/types/video";
import {HttpStatus} from "../../src/core/types/http-statuses";


describe('Videos API', () => {
    const app = express();
    setupApp(app);


    const testVideos: Video = {
        id: 1,
            title: 'How to learn js',
        author: 'Marko Polo',
        canBeDownloaded: false,
        minAgeRestriction: 18,
        createdAt: new Date().toISOString(),
        publicationDate: new Date().toISOString(),
        availableResolutions: Object.values(availableResolutions),
    };

    beforeAll(async () => {
        await request(app).delete('/testing/all-data').expect(HttpStatus.NoContent);
    });

    it('Should delete all data', async () => {
        await request(app).delete('/testing/all-data').expect(HttpStatus.NoContent);
    })

    it('Should create a video; POST /videos', async () => {
        const newVideo: Video = {
            ...testVideos,
            title:'Cars',
            author:'Bebrail',
        }

        await request(app)
            .post('/videos')
            .send(newVideo)
            .expect(HttpStatus.Created);
    })
    it('should return videos list; GET /videos', async () => {
        await request(app)
            .post('/videos')
            .send({...testVideos, title:'Video 1'})
            .expect(HttpStatus.Created);
        await request(app)
            .post('/videos')
            .send({...testVideos, title:'Video 2'})
            .expect(HttpStatus.Created);
        const videosListResponse = await request(app)
            .get('/videos')
            .expect(HttpStatus.Ok)
    })
    it('should return videos by ID; GET /videos:id', async () => {
        const createResponse = await request(app)
            .post('/videos')
            .send({...testVideos, title:'Video 1'})
            .expect(HttpStatus.Created);

        const getResponse = await request(app)
            .get(`/videos/${createResponse.body.id}`)
            .expect(HttpStatus.Ok);

        expect(getResponse.body).toEqual({
            ...createResponse.body,
            id:expect.any(Number),
            createdAt:expect.any(String)
        });
    })
    it('Should delete video by ID; DELETE /videos;id', async () => {
        const createResponse = await request(app)
            .post('/videos')
            .send({...testVideos, title:'Video 1'})
            .expect(HttpStatus.Created);
        await request(app)
            .post('/videos')
            .send({...testVideos, title:'Video 2'})
            .expect(HttpStatus.Created);

        await request(app)
            .delete(`/videos/${createResponse.body.id}`)
            .expect(HttpStatus.NoContent);


        const getResponse = await request(app)
            .get(`/videos/${createResponse.body.id}`)
        expect(getResponse.status).toBe(HttpStatus.NotFound);
    })
    it('Should update video by ID; PUT /videos;id', async () => {
        const createResponse = await request(app)
            .post('/videos')
            .send({...testVideos, title:'Video 1'})
            .expect(HttpStatus.Created);


        const videoUpadteData: Video = {
            ...createResponse.body,
            title: 'Tets',
        }

        await request(app)
            .put(`/videos/${createResponse.body.id}`)
            .send(videoUpadteData)
            .expect(HttpStatus.NoContent);



        const videoResponse = await request(app)
            .get(`/videos/${createResponse.body.id}`)

        expect(videoResponse.body).toEqual({
            ...videoUpadteData,
            id:createResponse.body.id,
            createdAt: expect.any(String)
        })

    })




});