import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as express from "express";
import * as helmet from "helmet";
import * as firebase from "firebase-admin";
import { Request, Response } from "express";

// intialize firebase
firebase.initializeApp({
    credential: firebase.credential.cert(require("./credentials.json")),
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
    firebase.messaging().send(req.body)
        .then((response) => {
            res.send(response);
        })
        .catch((error) => {
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
    console.log(`SquirrelFcmRelay Server successfully started on port ${port}!`);
});
