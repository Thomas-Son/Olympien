import { Router } from "express";
import { getCategory } from "../controller/category.js";

const router = Router();

router.get("/all", getCategory);

export default router;