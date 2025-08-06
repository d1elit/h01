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
        createdAt: new Date(),
        publicationDate: new Date(),
        availableResolutions: Object.values(availableResolutions),
    };

    beforeAll(async () => {
        await request(app).delete('/testing/all-data').expect(HttpStatus.NoContent);
    });

    it('Should delete all data', async () => {
        await request(app).delete('/testing/all-data').expect(HttpStatus.NoContent);
    })

});