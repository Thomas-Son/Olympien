import { Router } from "express";
import home_routes from "./home.routes.js";
import search_routes from "./search.routes.js";
import sub_routes from "./sub.routes.js";
import user_routes from "./user.routes.js";
import post_routes from "./post.routes.js";
import admin_routes from "./admin.routes.js";
import category_routes from "./category.routes.js";

const router = Router();

router.use("/api/v1", home_routes);
router.use("/api/v1/search", search_routes);
router.use("/api/v1/sub", sub_routes);
router.use("/api/v1/user", user_routes);
router.use("/api/v1/post", post_routes);

router.use("/api/v1/admin", admin_routes);

router.use("/api/v1/category", category_routes)

router.get("*", (req, res) => {
    res.status(404).json({ msg: "not found" });
});

export default router;
