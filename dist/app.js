import express from "express";
import cors from "cors";
const app = express();
// dotenv.config()
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(express.json({
    limit: "16kb"
}));
app.use(express.urlencoded({
    limit: "16kb",
    extended: true
}));
app.use(express.static("public"));
// //Routes import
import businessRoutes from "./routes/business.routes.js";
import ownerRoutes from "./routes/owner.route.js";
// //Routes declaration
app.use('/api/business', businessRoutes);
app.use('/api/owner', ownerRoutes);
export { app };
