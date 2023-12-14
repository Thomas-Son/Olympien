import { Router } from "express";
import { getPost } from "../controller/home.js";

const router = Router();

router.get("/", getPost);

export default router;