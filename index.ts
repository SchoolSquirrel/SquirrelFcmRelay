import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as express from "express";
import * as helmet from "helmet";
import * as firebase from "firebase-admin";
import { Request, Response } from "express";
import { config as envConfig } from "dotenv";

if (process.env.NODE_ENV?.trim() == "development") {
    console.log(envConfig());
}

const properties = [
    "type",
    "project_id",
    "private_key_id",
    "private_key",
    "client_email",
    "client_id",
    "auth_uri",
    "token_uri",
    "auth_provider_x509_cert_url",
    "client_x509_cert_url",
];
const config = {};
for (const p of properties) {
    config[p] = process.env[p]?.replace(/\\n/g, "\n");
}

// intialize firebase
firebase.initializeApp({
    credential: firebase.credential.cert(config),
});

// Create a new express application instance
const app = express();

// Call midlewares
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
if (app.get("env") === "production") {
    app.set("trust proxy", 1);
}
// Setup route
app.post("/", (req: Request, res: Response) => {
    if (!req.body?.token) {
        res.status(400).send("You must specify a token of a device to send the notification to!");
        return;
    }
    if (req.body?.topic) {
        res.status(400).send("Sending notifications to topics is not allowed!");
        return;
    }
    if (req.body?.condition) {
        res.status(400).send("Sending notifications to conditions is not allowed!");
        return;
    }
    firebase.messaging().send({
        notification: req.body.notification || {},
        data: req.body.data || {},
        token: req.body.token,
    }).then((response) => {
        res.send(response);
    }).catch((error) => {
        res.status(500);
        res.send(error);
    });
});
// Default route
app.get("/", (req: Request, res: Response) => {
    res.redirect("https://github.com/SchoolSquirrel/SquirrelFcmRelay");
});

// Start server
const port = process.env.port || (app.get("env") === "production" ? 80 : 3000);
app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`SquirrelFcmRelay Server successfully started on port ${port}!`);
});
