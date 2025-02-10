import express, { urlencoded } from "express";
import EmployeeRouter from "./routes/fe_assg.js";

const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use("/api",EmployeeRouter)
export default app;
