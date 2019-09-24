
import * as admin from 'firebase-admin';

const serviceAccount = require('../service-account.json');

export const initializeServices = () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

export const adminService = admin;
