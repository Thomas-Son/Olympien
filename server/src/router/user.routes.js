import { Router } from "express";
import { check_token, createAccount, signin, signout, getInfoUser, getUserPublication, getUserSub } from "../controller/user.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.get("/check_token", auth, check_token);

router.post("/signup", createAccount);
router.post("/signin", signin);
router.post("/signout", signout)

router.get("/:alias", getInfoUser)
router.get("/publication/:alias", getUserPublication)
router.get("/sub/:alias", getUserSub)

export default router;