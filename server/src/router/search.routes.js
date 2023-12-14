import { Router } from "express";
import { searchUserList } from "../controller/search.js";

const router = Router();

router.get("/user/:alias", searchUserList);

export default router;