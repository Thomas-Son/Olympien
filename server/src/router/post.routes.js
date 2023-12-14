import { Router } from "express";
import { addPost } from "../controller/post.js";

const router = Router();

router.post("/add", addPost);

export default router;