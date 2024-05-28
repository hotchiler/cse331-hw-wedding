import express, { Express } from "express";
import { getGuests, addGuest, updateGuest } from './routes';
import bodyParser from 'body-parser';


// Configure and start the HTTP server.
const port: number = 8088;
const app: Express = express();
app.use(bodyParser.json());
app.get("/api/guests", getGuests);
app.post("/api/guests", addGuest);
app.put("/api/guests/:id", updateGuest);
app.listen(port, () => console.log(`Server listening on ${port}`));
