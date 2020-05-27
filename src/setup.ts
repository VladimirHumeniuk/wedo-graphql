
import * as admin from 'firebase-admin';
import algoliasearch, { SearchClient } from 'algoliasearch/lite';

const dotenv = require('dotenv').config();
const serviceAccount = require('../service-account.json');

export const initializeServices = () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

export const adminService = admin;

export const algClient: SearchClient = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_API_KEY
);