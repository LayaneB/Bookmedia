import dotenv from 'dotenv'

dotenv.config()

const admin = require("firebase-admin");
const serviceAccount= JSON.parse(process.env.FIREBASE_KEY as string)

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

export const db = admin.firestore()
