import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

import locationRoute from "./routes/locationRoute";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/locations", locationRoute);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});