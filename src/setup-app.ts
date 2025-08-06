import express, { Express } from 'express';
import {videosRouter} from "./videos/router/videos.router";
import {testingRouter} from "./testing/routers/testing.router";

export const setupApp = (app: Express) => {
  app.use(express.json()); // middleware для парсинга JSON в теле запроса


  // основной роут
  app.get('/', (req, res) => {
    res.status(200).send('Hello worlввввdввв!');
  });

  app.use('/videos',videosRouter);
  app.use('/testing', testingRouter);
  return app;
};
