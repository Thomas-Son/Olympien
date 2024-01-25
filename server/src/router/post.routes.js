import { Router } from "express";
import { addPost } from "../controller/post.js";

import { auth } from "../middleware/auth.js";

const router = Router();

router.post("/add", auth, addPost);

export default router;