import express from "express";
import cors from "cors";
import "dotenv/config";

import router from "./router/index.routes.js";

const app = express();
const PORT = process.env.PORT || process.env.LOCAL_PORT;

app.use(express.static("public"))
    .use(cors())
    .use(express.urlencoded({ extended: true }))
    .use(express.json())
    .use(router)

app.listen(PORT, () => console.log(`running on http://localhost:${PORT}`));