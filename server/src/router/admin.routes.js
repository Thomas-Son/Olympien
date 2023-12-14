import { Router } from "express";
import { getUserAll } from "../controller/admin/user.js";
import { getUserPost } from "../controller/admin/post.js";
import { getRoleAll, addRole } from "../controller/admin/role.js";
import { getCategoryAll, addCategory } from "../controller/admin/category.js";

const router = Router();

router.get("/user/all", getUserAll);
router.get("/:alias", getUserPost);

router.get("/role/all", getRoleAll);
router.get("/role/add", addRole);

router.get("/category/all", getCategoryAll);
router.post("/category/add", addCategory)

export default router;
