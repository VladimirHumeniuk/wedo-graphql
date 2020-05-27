"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
const lite_1 = require("algoliasearch/lite");
const dotenv = require('dotenv').config();
const serviceAccount = require('../service-account.json');
exports.initializeServices = () => {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
};
exports.adminService = admin;
exports.algClient = lite_1.default(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY);
//# sourceMappingURL=setup.js.map