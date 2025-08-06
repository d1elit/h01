import express, { Express } from 'express';
import {videosRouter} from "./videos/router/videos.router";

export const setupApp = (app: Express) => {
  app.use(express.json()); // middleware для парсинга JSON в теле запроса


  // основной роут
  app.get('/', (req, res) => {
    res.status(200).send('Hello worlввввdввв!');
  });

  app.use('/videos',videosRouter);
  return app;
};
