"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
const serviceAccount = require('../service-account.json');
exports.initializeServices = () => {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
};
exports.adminService = admin;
//# sourceMappingURL=setup.js.map