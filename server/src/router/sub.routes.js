import { Router } from "express";
import { getSub, subPost, getSubDetail, getSubCategory } from "../controller/sub.js";

const router = Router();

router.get("/all", getSub);
router.post("/post", subPost);
router.get("/:id", getSubDetail)
router.get("/category/:category", getSubCategory)

export default router;