import { Router } from "express";
import { searchUserList } from "../controller/search.js";

import { auth } from "../middleware/auth.js";

const router = Router();

router.get("/user/:alias", auth, searchUserList);

export default router;