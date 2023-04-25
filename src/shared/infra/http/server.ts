import 'dotenv/config';
import 'reflect-metadata';
import env from '@config/env';
import { http } from '@config/http';
import knexfile from '@config/knex';
import { knexormHelper } from '../knexorm';
import cors from 'cors';

knexormHelper
  .connect(knexfile)
  .then(() => {
    http.use(cors());
    http.listen(env.port, () => {
      console.log('Server started on port:', env.port);
    });
  })
  .catch(err => {
    console.error('Error during knex connect', err);
  });
