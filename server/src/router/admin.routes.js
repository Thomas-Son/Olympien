import { Router } from "express";
import { getUserAll, getUser, createUser, deleteUser, updateUser } from "../controller/admin/user.js";
import { getUserPost } from "../controller/admin/post.js";
import { getRoleAll, addRole, getRole, deleteRole, updateRole } from "../controller/admin/role.js";
import { getCategoryAll, getCategory, addCategory, deleteCategory, updateCategory } from "../controller/admin/category.js";

import { auth } from "../middleware/auth.js";

const router = Router();

router.get("/user/all", auth, getUserAll);
router.get("/user/:id", getUser);
router.post("/user/create", createUser);
router.delete("/user/delete/:id", deleteUser);
router.post("/user/update/:id", updateUser);

router.get("/:alias", getUserPost);

router.get("/role/all", auth, getRoleAll);
router.get("/role/:id", getRole);
router.post("/role/add", addRole);
router.delete("/role/delete/:id", deleteRole);
router.post("/role/update/:id", updateRole);

router.get("/category/all", auth, getCategoryAll);
router.get("/category/:id", getCategory);
router.post("/category/add", addCategory)
router.delete("/category/delete/:id", deleteCategory);
router.post("/category/update/:id", updateCategory);


export default router;
