import express, {Express} from 'express'
import cors from 'cors'
import { AddressInfo } from 'net'

export const app: Express = express();

app.use(express.json());
app.use(cors());

const admin = require("firebase-admin");
const serviceAccount = require("../../key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export const db = admin.firestore()

const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
       const address = server.address() as AddressInfo;
       console.log(`Server is running in http://localhost: ${address.port}`);
    } else {
       console.error(`Failure upon starting server.`);
    }
});