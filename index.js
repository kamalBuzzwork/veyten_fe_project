import app from "./app.js";
import { startServer } from "./db/mongoose.js";

startServer(
  8081,
  "mongodb+srv://kamal:VuzRyCHIZWx4B5YU@cluster0.uj2soph.mongodb.net/veyten_fe",
  app
);
